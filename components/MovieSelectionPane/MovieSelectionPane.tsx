"use client"

import { FC, useState, useEffect } from "react"
import { movieTypes } from "@/types/movie.interface"
import useImage from "@/hooks/useImage/useImage"
import { HEADERS_ALLOW_ORIGIN, SWR_FETCHER } from "@/constants"
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
  // const [selectedMovie, setSelectedMovie] = useState<movieTypes>()
  const [isDisplayingCastandCrew, setIsDisplayingCastandCrew] = useState(true)

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
    tagline,
    title,
    "watch/providers": watchProviders
  } = selectedMovie || {}

  // NOTE: to avoid rendering incomplete/WIP labels (eg. ??????)
  const formattedSpokenLanguages = spokenLanguages?.map(x => ({
    name: x.name && !x.name.includes("?") ? x.name : x.english_name
  }))

  const starring = cast
    ?.filter(item => item.known_for_department === "Acting")
    .map(({ original_name }) => ({ name: original_name }))
    .slice(0, 5)

  const directors = crew?.filter(item => item.job === "Director").map(({ original_name }) => ({ name: original_name }))

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
            blurBackdrop: !isDisplayingCastandCrew
          }}
        />

        <div
          className="bg-gradient-to-b from-transparent from-1% to-primary-500 to-50% 
        p-3 absolute bottom-0 rounded-b-xl z-10 w-full h-full"
        >
          {isDisplayingCastandCrew && (
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
                {isDisplayingCastandCrew ? <>🎬 Full Cast & Crew</> : <>🎥 Summary</>}
              </button>
            )}
          </div>

          {isDisplayingCastandCrew ? (
            <div className="flex-col h-[600px] p-5 grid grid-rows-3 w-[70%]">
              <div />
              <div />
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
          ) : (
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
          )}
        </div>
      </div>
    </div>
  )
}

export default MovieSelectionPane
