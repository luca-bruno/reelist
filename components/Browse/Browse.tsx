"use client"

import { FC, useEffect, useState } from "react"
import { IS_BROWSER } from "@/constants"
import { movieTypes } from "@/types/movie.interface"
import { filterTypes } from "@/types/filter.interface"
import BrowseHeader from "./BrowseHeader"
import MovieCardList from "../MovieCardList"
import MovieSelectionPane from "../MovieSelectionPane"
import BrowseFilters from "./BrowseFilters"

interface BrowseTypes {
  movies: movieTypes[]
  defaultMovieDetails?: movieTypes
  playlistKey?: string
  query?: string
  hasFilters?: boolean
  hasQuery?: boolean
}

const Browse: FC<BrowseTypes> = ({ movies, defaultMovieDetails, playlistKey, hasFilters, query, hasQuery }) => {
  const [selectedMovieId, setSelectedMovieId] = useState<number>()
  const [page, setPage] = useState(1)
  const [playlistMovies, setPlaylistMovies] = useState<movieTypes[] | null>()

  useEffect(() => {
    if (IS_BROWSER && playlistKey && !hasFilters && !hasQuery) {
      setPlaylistMovies(JSON.parse(localStorage.getItem(playlistKey) as string))
    } else {
      setPlaylistMovies(null)
    }
  }, [hasFilters, hasQuery, playlistKey])

  // Reset the page when query or filters change
  useEffect(() => {
    if ((hasFilters || hasQuery || !query) && page > 1) {
      setPage(1)
    }
  }, [hasFilters, hasQuery])

  useEffect(() => {
    // When the component mounts, check if there is a page param and update currentPage if necessary
    const currentQueryParams = new URLSearchParams(window.location.search)
    const page = currentQueryParams.get("page")
    if (page) {
      setPage(parseInt(page))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("has-user-previously-visited", "true")
  }, [])

  return (
    <main className="grid grid-flow-row grid-rows-2 mobileXL:grid-rows-none mobileXL:grid-cols-3">
      <div className="rounded-xl m-3 mobileL:overflow-x overflow-x-none bg-neutral-500 h-[calc(100vh-75px)] flex flex-col">
        <BrowseHeader {...{ page, setPage, movies }} />
        <BrowseFilters />
        <MovieCardList
          {...{
            setSelectedMovieId,
            selectedMovieId,
            // genres,
            movies: playlistMovies || movies,
            isDisplayingGridView: true
          }}
        />
      </div>

      <MovieSelectionPane
        {...{
          selectedMovieId: selectedMovieId || defaultMovieDetails?.id || playlistMovies?.[0]?.id || movies?.[0]?.id
        }}
      />
    </main>
  )
}

export default Browse
