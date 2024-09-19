"use client"

import React, { useEffect, useState } from "react"
import { movieTypes } from "@/json/data.interface"
import useImage from "@/hooks/useImage/useImage"
import useFetchMovies from "@/hooks/useFetchMovies/useFetchMovies"
import MovieSelectionPaneBackground from "./MovieSelectionPaneBackground"
import MovieSelectionPaneCover from "./MovieSelectionPaneCover"
import MovieSelectionPaneDetails from "./MovieSelectionPaneDetails"
import MovieSelectionPanePlayButton from "./MovieSelectionPanePlayButton"

const MovieSelectionPane: React.FC<{ selectedMovieId: string, query?: string }> = ({ selectedMovieId, query }) => {
    const [selectedMovie, setSelectedMovie] = useState<movieTypes>()
    // const searchTerm = "God"
    // const { movies } = useFetchMovies(true, query)
    const [movies, setMovies] = useState()

    // TODO: SWR or react-query + make into custom hook
    useEffect(() => {
      async function fetchMovies() {
        const response = await fetch(`api/movies?q=${query}`)
        const data = await response.json()
        setMovies(data)
      }
      fetchMovies()
    }, [query])
  

    const {
        hasImageLoaded,
        setHasImageLoaded,
        hasReturnedError,
        setHasReturnedError,
        hasBackgroundImageReturnedError,
        setHasBackgroundImageReturnedError
    } = useImage()

    const {
        original_title: title,
        // provider_title: providerTitle,
        poster_path: poster,
        backdrop_path: backdrop
        // cats: categoryTags,
        // feats: featureTags,
        // thms: themeTags
    } = selectedMovie || {}

    useEffect(() => {
        setSelectedMovie(movies?.filter(movie => movie.id === selectedMovieId)[0])
        setHasImageLoaded(false)
        setHasReturnedError(false)
        setHasBackgroundImageReturnedError(false)
    }, [movies, selectedMovieId, setHasBackgroundImageReturnedError, setHasImageLoaded, setHasReturnedError])

    return (
        <div className="flex justify-center col-span-1 mobileXL:col-span-2 rounded-xl m-3 overflow-hidden" >
            <div className="relative h-full w-full">
                <MovieSelectionPaneBackground
                    {...{
                        title,
                        background: backdrop,
                        hasBackgroundImageReturnedError,
                        setHasBackgroundImageReturnedError,
                        iconSmall: backdrop,
                        // iconLarge,
                        hasReturnedError,
                        setHasReturnedError
                    }}
                />

                <div className="bg-gradient-to-b from-transparent from-1% to-gray-500
                    p-3 absolute bottom-0 rounded-xl z-10 w-full h-[45%]"
                >
                    <MovieSelectionPaneCover
                        {...{
                            title,
                            hasImageLoaded,
                            setHasImageLoaded,
                            hasReturnedError,
                            setHasReturnedError,
                            // iconLarge,
                            iconSmall: poster
                        }}
                    />

                    <MovieSelectionPanePlayButton />

                    <div className="p-5">
                        {title && <MovieSelectionPaneDetails {...{ title }} />}
                        {/* <MovieSelectionPaneTags {...{ categoryTags, featureTags, themeTags }} /> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieSelectionPane