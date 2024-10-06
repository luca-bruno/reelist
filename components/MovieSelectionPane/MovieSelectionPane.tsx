"use client"

import { FC, useState, useEffect } from "react"
import { movieTypes } from "@/types/movie.interface"
import useImage from "@/hooks/useImage/useImage"
import { HEADERS_ALLOW_ORIGIN } from "@/constants"
import MovieSelectionPaneBackground from "./MovieSelectionPaneBackground"
import MovieSelectionPanePoster from "./MovieSelectionPanePoster"
import MovieSelectionPaneDetails from "./MovieSelectionPaneDetails"
import MovieSelectionPaneDropdown from "./MovieSelectionPaneDropdown"
import { MovieSelectionPaneTypes } from "./types/MovieSelectionPane.interface"

const MovieSelectionPane: FC<MovieSelectionPaneTypes> = ({ selectedMovieId }) => {
  const [selectedMovie, setSelectedMovie] = useState<movieTypes>()

  // TODO: CLEAN UP ASAP@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  // TODO: SWR or react-query + make into custom hook
  useEffect(() => {
    if (selectedMovieId) {
      const fetchMovie = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/movie?id=${selectedMovieId}`, HEADERS_ALLOW_ORIGIN)
        const data = await response.json()
        setSelectedMovie(data)
      }

      fetchMovie()
    }
  }, [selectedMovieId])

  // // TODO: CLEAN UP ASAP@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  // // TODO: SWR or react-query + make into custom hook
  // useEffect(() => {
  //   async function fetchMovie() {
  //     const response = await fetch(`../api/movie?id=${selectedMovieId}`)
  //     const data = await response.json()
  //     setSelectedMovie(data)
  //   }

  //   fetchMovie()
  // }, [selectedMovieId])

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

  const directors = crew
    ?.filter(item => item.job === "Director")
    .map(({ original_name }) => ({ name: original_name }))

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
            setHasReturnedError
          }}
        />

        <div
          className="bg-gradient-to-b from-transparent from-1% to-primary-500 to-50% 
            p-3 absolute bottom-0 rounded-b-xl z-10 w-full h-full"
        >
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

          {selectedMovie && <MovieSelectionPaneDropdown {...{ selectedMovie }} />}

          <div className="flex-col h-[600px] p-5 grid grid-rows-3 w-[70%]">
            <div />
            <div />
            <div>
              {title && (
                <MovieSelectionPaneDetails
                  {...{
                    originCountry,
                    originalTitle,
                    runtime,
                    releaseDate,
                    ageRating,
                    overview,
                    tagline,
                    title,
                    tags: {
                      directorTags: { title: "Director(s)", payload: directors },
                      starringTags: { title: "Starring", payload: starring },
                      genreTags: { title: "Genre(s)", payload: genres },
                      languageTags: {
                        title: "Language(s)",
                        payload: formattedSpokenLanguages
                      },
                    }
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieSelectionPane
