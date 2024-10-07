"use client"

import { FC, useEffect, useState } from "react"
import { movieTypes } from "@/types/movie.interface"
import { HEADERS_ALLOW_ORIGIN, IS_BROWSER } from "@/constants"
import Search from "../Search"
import MovieCardList from "../MovieCardList"
import MovieSelectionPane from "../MovieSelectionPane"
import YearFilterSelector from "../YearFilterSelector"
import GenreFilterSelector from "../GenreFilterSelector"
import LanguageFilterSelector from "../LanguageFilterSelector"
import CountryFilterSelector from "../CountryFilterSelector"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons/faArrowLeft"
import { faArrowRight } from "@fortawesome/free-solid-svg-icons/faArrowRight"
import { buttonStyles } from "@/helpers"

const Browse: FC<{ params?: { id?: string; key?: string } }> = ({ params }) => {
  const { id, key } = params || {}

  const [query, setQuery] = useState("")
  const [movies, setMovies] = useState<movieTypes[]>()
  const [defaultMovieDetails, setDefaultMovieDetails] = useState<movieTypes | undefined>()
  const [selectedMovieId, setSelectedMovieId] = useState<number>()
  const [filter, setFilter] = useState<{ genres?: string; origin_country?: string; original_language?: string; year?: string }>()

  const formattedCastMembers = defaultMovieDetails?.credits?.cast.map(castMember => castMember.id).join("|")
  const haveFiltersBeenSelected = filter && Object.keys(filter).length > 0

  const alignmentStyles = "flex justify-start items-start"
  const filterWrapperStyles =
    "laptopM:[&>*:not(:first-child)]:mx-2 mobileXL:[&>*:not(:first-child)]:mx-0 [&>*:not(:first-child)]:mx-2 laptopM:mr-1 mx-0 mr-3"

  useEffect(() => {
    localStorage.setItem("has-user-previously-visited", "true")
  }, [])


  useEffect(() => {
    async function fetchMovieById() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/movie?id=${id}`, HEADERS_ALLOW_ORIGIN)
      const data = await response.json()
      setDefaultMovieDetails(data)
    }

    async function fetchMoviesByQuery() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/movies?q=${query}`, HEADERS_ALLOW_ORIGIN)
      const data = await response.json()

      if (query !== "") {
        localStorage.setItem("Latest Search Results", JSON.stringify(data))
      }
      setMovies(data)
    }

    if (query) {
      // If query is not empty, fetch movies by query (this takes precedence)
      fetchMoviesByQuery()
    } else if (id) {
      // If query is empty but we have an id, fetch the movie by id
      fetchMovieById()
    } else if (IS_BROWSER && key) {
      const storedSelectedPlaylistMovies = JSON.parse(localStorage.getItem(key) as string)
      setMovies(storedSelectedPlaylistMovies)
    } else {
      fetchMoviesByQuery()
    }
  }, [id, key, query])

  useEffect(() => {
    async function fetchMoviesByIdAndGenre() {
      const groqGenreResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/genre?movie=${defaultMovieDetails?.title}`, HEADERS_ALLOW_ORIGIN)
      const groqGenreResponseData = await groqGenreResponse.json()

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/movies?g=${groqGenreResponseData}&c=${formattedCastMembers}`,
        HEADERS_ALLOW_ORIGIN
      )
      const data = await response.json()

      const isMovieAlreadyInList = data.some((movie: movieTypes) => movie.id === defaultMovieDetails?.id)

      setMovies(defaultMovieDetails && !isMovieAlreadyInList ? [defaultMovieDetails, ...data] : data)
    }

    if (defaultMovieDetails && formattedCastMembers && !query) {
      // Only fetch genre-based movies if we have the movie details, cast, and query is empty
      fetchMoviesByIdAndGenre()
    }
  }, [defaultMovieDetails, formattedCastMembers, query])

  return (
    <main className="grid grid-flow-row grid-rows-2 mobileXL:grid-rows-none mobileXL:grid-cols-3">
      <div className="rounded-xl m-3 mobileL:overflow-x overflow-x-none bg-neutral-500 h-[calc(100vh-75px)] flex flex-col">
        <div className={`${alignmentStyles} ml-3 mt-3 mr-2`}>
          <Search setQuery={setQuery} />

          <div className="m-auto mobileL:mr-1 mobileXL:h-10 h-max flex ml-0">
            {/* <ToggleButton state={isDisplayingGridView} stateSetter={setIsDisplayingGridView} onIcon={faList} offIcon={faGrip} /> */}
            <button
              type="button"
              className={`w-10 ${buttonStyles}`}
              // onClick={() => stateSetter(prev => !prev)}
            >
              <FontAwesomeIcon className="h-5 w-5 text-white flex m-auto" icon={faArrowLeft} aria-hidden="true" />
            </button>
            <button
              type="button"
              className={`w-10 ${buttonStyles}`}
              // onClick={() => stateSetter(prev => !prev)}
            >
              <FontAwesomeIcon className="h-5 w-5 text-white flex m-auto" icon={faArrowRight} aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className={`ml-3 mt-3 ${alignmentStyles} ${filterWrapperStyles} grid grid-cols-2 text-black mobileXL:flex-col laptopM:flex-row`}>
          <YearFilterSelector {...{ setFilter }} />
          {/* make note that every genre search is inclusive (OR / |) */}
          <GenreFilterSelector {...{ setFilter }} />
        </div>

        <div className={`m-3 ${alignmentStyles} grid grid-cols-1 text-black mobileXL:flex-col laptopM:flex-row`}>
          <LanguageFilterSelector {...{ setFilter }} />
        </div>
        <div className={`m-3 my-0 ${alignmentStyles} grid grid-cols-1 text-black mobileXL:flex-col laptopM:flex-row`}>
          <CountryFilterSelector {...{ setFilter }} />
        </div>

        <MovieCardList
          {...{
            setSelectedMovieId,
            selectedMovieId,
            // genres,
            movies,
            isDisplayingGridView: true
          }}
        />
      </div>

      {/* // TODO: CLEAN UP ASAP THIS SELECTEDMOVIE AND DEFAULTMOVIEDETAILS STUFF */}
      <MovieSelectionPane
        {...{
          selectedMovieId: selectedMovieId || defaultMovieDetails?.id || movies?.[0].id
        }}
      />
    </main>
  )
}

export default Browse
