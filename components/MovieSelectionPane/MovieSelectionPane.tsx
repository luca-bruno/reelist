"use client"

import { FC, useState, useEffect } from "react"
import useImage from "@/hooks/useImage/useImage"
import { SWR_FETCHER } from "@/constants"
import { transitionStyles } from "@/helpers"
import useSWR from "swr"
import MovieSelectionPaneBackground from "./MovieSelectionPaneBackground"
import MovieSelectionPanePoster from "./MovieSelectionPanePoster"
import MovieSelectionPaneDetails from "./MovieSelectionPaneDetails"
import MovieSelectionPaneDropdown from "./MovieSelectionPaneDropdown"
import { MovieSelectionPaneTypes } from "./types/MovieSelectionPane.interface"
import MovieSelectionPaneCastCrewDetails from "./MovieSelectionPaneCastCrewDetails"
import MovieSelectionPaneDetailsHeader from "./MovieSelectionPaneDetailsHeader"

const MovieSelectionPane: FC<MovieSelectionPaneTypes> = ({ selectedMovieId }) => {
  const [isDisplayingCastandCrew, setIsDisplayingCastandCrew] = useState(false)

  // TODO: split off and use this template
  // const useCountries = (skipCondition: boolean) => {
  //   const { data, error, isLoading } = useSWR(!skipCondition ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/countries` : null, SWR_FETCHER, {
  //     revalidateOnMount: true,
  //     revalidateOnFocus: false
  //   })

  const { data: selectedMovie, error } = useSWR(
    selectedMovieId ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/movie?id=${selectedMovieId}` : null,
    SWR_FETCHER,
    {
      revalidateOnMount: true,
      revalidateOnFocus: false
    }
  )

  const {
    hasImageLoaded,
    setHasImageLoaded,
    hasReturnedError,
    setHasReturnedError,
    hasBackgroundImageReturnedError,
    setHasBackgroundImageReturnedError
  } = useImage()

  const {
    backdrop_path: backdrop,
    credits: { cast = [], crew = [] } = {}, // Handle undefined credits with default values
    origin_country: originCountry,
    original_title: originalTitle,
    overview,
    genres,
    poster_path: poster,
    release_date: releaseDate,
    release_dates: ageRating,
    runtime,
    spoken_languages: spokenLanguages,
    title,
    "watch/providers": watchProviders
  } = selectedMovie || {}

  // NOTE: to avoid rendering incomplete/WIP labels (eg. ??????)
  const formattedSpokenLanguages = spokenLanguages?.map((spokenLanguage: { name: string; english_name: string }) => ({
    name: spokenLanguage.name && !spokenLanguage.name.includes("?") ? spokenLanguage.name : spokenLanguage.english_name
  }))

  const starring = cast
    ?.filter((item: { known_for_department: string }) => item.known_for_department === "Acting")
    .map(({ original_name }: { original_name: string }) => ({ name: original_name }))
    .slice(0, 5)

  const directors = crew
    ?.filter((item: { job: string }) => item.job === "Director")
    .map(({ original_name }: { original_name: string }) => ({ name: original_name }))

  useEffect(() => {
    setHasImageLoaded(false)
    setHasReturnedError(false)
    setHasBackgroundImageReturnedError(false)
  }, [setHasBackgroundImageReturnedError, setHasImageLoaded, setHasReturnedError])

  return (
    <div className="flex justify-center col-span-1 mobileXL:col-span-2 rounded-xl m-3 overflow-hidden">
      <div className="relative h-full w-full">
        <MovieSelectionPaneBackground
          {...{
            title,
            background: backdrop,
            hasBackgroundImageReturnedError,
            setHasBackgroundImageReturnedError,
            hasReturnedError,
            setHasReturnedError,
            blurBackdrop: isDisplayingCastandCrew
          }}
        />

        <div
          className="bg-gradient-to-b from-transparent from-1% to-primary-500 to-50% 
            p-3 absolute bottom-0 rounded-b-xl z-10 w-full h-full"
        >
          {!isDisplayingCastandCrew && (
            <MovieSelectionPanePoster
              {...{
                title,
                hasImageLoaded,
                setHasImageLoaded,
                hasReturnedError,
                setHasReturnedError,
                poster,
                watchProviders
              }}
            />
          )}

          <div className="flex justify-between">
            {selectedMovie && <MovieSelectionPaneDropdown {...{ selectedMovie }} />}
            {selectedMovie && (
              <button
                type="button"
                onClick={() => setIsDisplayingCastandCrew(prev => !prev)}
                className={`px-3 flex justify-center items-center h-[38px] rounded-xl opacity-80 
                  hover:opacity-100 bg-[gray] hover:bg-accent-500 ${transitionStyles}`}
              >
                {isDisplayingCastandCrew ? <>🎥 Summary</> : <>🎬 Full Cast & Crew</>}
              </button>
            )}
          </div>

          {isDisplayingCastandCrew ? (
            <>
              <div className="p-5 pb-0">
                <MovieSelectionPaneDetailsHeader
                  {...{
                    originCountry,
                    originalTitle,
                    runtime,
                    releaseDate,
                    ageRating,
                    title
                  }}
                />
              </div>
              <div className="p-5 rounded-lg shadow-md overflow-y-auto h-[calc(100%-0.75rem-38px-40px-36px-20px)]">
                <MovieSelectionPaneCastCrewDetails
                  {...{
                    crew,
                    cast
                  }}
                />
              </div>
            </>
          ) : (
            // <div className="absolute bottom-[3.5rem] h-[469px] p-5 w-[70%]">
            // <div className="absolute bottom-2 h-[469px] p-5 w-[70%]">
            <div className="absolute bottom-2 min-h-[469px] max-h-[516px] p-5 w-[70%]">
              <div>
                {title && (
                  <>
                    <MovieSelectionPaneDetailsHeader
                      {...{
                        originCountry,
                        originalTitle,
                        runtime,
                        releaseDate,
                        ageRating,
                        isTruncatedCountries: true,
                        title
                      }}
                    />
                    <MovieSelectionPaneDetails
                      {...{
                        overview,
                        tags: {
                          directorTags: { title: "Director(s)", payload: directors },
                          starringTags: { title: "Starring", payload: starring },
                          genreTags: { title: "Genre(s)", payload: genres },
                          languageTags: {
                            title: "Language(s)",
                            payload: formattedSpokenLanguages
                          }
                        }
                      }}
                    />
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MovieSelectionPane
