"use client"

import { FC, useEffect, useState } from "react"
import { movieTypes } from "@/types/movie.interface"
import { HEADERS_ALLOW_ORIGIN, IS_BROWSER } from "@/constants"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons/faArrowLeft"
import { faArrowRight } from "@fortawesome/free-solid-svg-icons/faArrowRight"
import { buttonStyles, transitionStyles } from "@/helpers"
import { filterParamTypes, filterTypes } from "@/types/filter.interface"
import Search from "../Search"
import MovieCardList from "../MovieCardList"
import MovieSelectionPane from "../MovieSelectionPane"
import YearFilterSelector from "../YearFilterSelector"
import GenreFilterSelector from "../GenreFilterSelector"
import LanguageFilterSelector from "../LanguageFilterSelector"
import CountryFilterSelector from "../CountryFilterSelector"

// Constants & Helper functions
const alignmentStyles = "flex justify-start items-start"
const filterWrapperStyles =
  "laptopM:[&>*:not(:first-child)]:mx-2 mobileXL:[&>*:not(:first-child)]:mx-0 [&>*:not(:first-child)]:mx-2 laptopM:mr-1 mx-0 mr-3"

const buildQueryString = (filters?: filterParamTypes) => {
  const params = new URLSearchParams()

  if (filters) {
    if (filters.genres) params.append("g", filters.genres)
    if (filters.origin_country) params.append("oc", filters.origin_country)
    if (filters.original_language) params.append("l", filters.original_language)
    if (filters.year) params.append("y", filters.year)
  }

  return params.toString()
}

const fetchMovies = async (url: string) => {
  const response = await fetch(url, HEADERS_ALLOW_ORIGIN)
  return response.json()
}

const Browse: FC<{ params?: { id?: string; key?: string } }> = ({ params }) => {
  const { id, key } = params || {}

  const [query, setQuery] = useState("")
  const [movies, setMovies] = useState<movieTypes[]>()
  const [defaultMovieDetails, setDefaultMovieDetails] = useState<movieTypes | undefined>()
  const [selectedMovieId, setSelectedMovieId] = useState<number>()
  const [filter, setFilter] = useState<filterTypes>()
  const [page, setPage] = useState<number>(1)

  const formattedCastMembers = defaultMovieDetails?.credits?.cast.map(castMember => castMember.id).join("|")
  const haveFiltersBeenSelected = filter && Object.keys(filter).length > 0

  // Fetch Functions
  const fetchMovieById = async () => {
    const data = await fetchMovies(`${process.env.NEXT_PUBLIC_BASE_URL}/api/movie?id=${id}`)
    setDefaultMovieDetails(data)
  }

  const fetchMoviesByQuery = async () => {
    const data = await fetchMovies(`${process.env.NEXT_PUBLIC_BASE_URL}/api/movies?q=${query}&p=${page}`)
    if (query) localStorage.setItem("Latest Search Results", JSON.stringify(data))
    setMovies(data)
  }

  const fetchMoviesByFiltersAndQuery = async () => {
    const queryString = buildQueryString(filter as filterParamTypes)
    const data = await fetchMovies(`${process.env.NEXT_PUBLIC_BASE_URL}/api/movies?${queryString}&p=${page}`)

    // If there is a query, filter results based on the query term
    const filteredMovies = query ? data.filter((movie: movieTypes) => movie.title.toLowerCase().includes(query.toLowerCase())) : data

    localStorage.setItem("Latest Search Results", JSON.stringify(filteredMovies))
    setMovies(filteredMovies)
  }

  const fetchMoviesByFiltersOnly = async () => {
    const queryString = buildQueryString(filter as filterParamTypes)
    console.log("Fetching movies with filters only:", queryString) // Log the query string for filters
    const data = await fetchMovies(`${process.env.NEXT_PUBLIC_BASE_URL}/api/movies?${queryString}&p=${page}`)
    console.log("Fetched movies:", data) // Log the fetched movies
    localStorage.setItem("Latest Search Results", JSON.stringify(data))
    setMovies(data) // Set movies based on filter results
  }

  const fetchMoviesByIdAndGenre = async () => {
    const genreResponse = await fetchMovies(`${process.env.NEXT_PUBLIC_BASE_URL}/api/genre?movie=${defaultMovieDetails?.title}`)
    const data = await fetchMovies(`${process.env.NEXT_PUBLIC_BASE_URL}/api/movies?g=${genreResponse}&c=${formattedCastMembers}&p=${page}`)
    const isMovieInList = data?.some((movie: movieTypes) => movie.id === defaultMovieDetails?.id)
    setMovies(defaultMovieDetails && !isMovieInList ? [defaultMovieDetails, ...data] : data)
  }

  useEffect(() => {
    localStorage.setItem("has-user-previously-visited", "true")
  }, [])

  useEffect(() => {
    console.log("Fetching with Query:", query, "Filters:", filter)

    const handleFetch = async () => {
      const hasQuery = query.trim() !== "" // Checks for non-empty query
      const hasFilters = filter && Object.keys(filter).some(filterKey => filter[filterKey as keyof filterTypes])

      if (hasFilters && hasQuery) {
        console.log("HAS FILTERS AND HAS QUERY")
        // Both filters and query are present
        await fetchMoviesByFiltersAndQuery()
      } else if (hasFilters) {
        console.log("HAS FILTERS")
        // Only filters are present
        await fetchMoviesByFiltersOnly()
      } else if (hasQuery) {
        console.log("HAS QUERY")
        // Only query is present
        await fetchMoviesByQuery()
      } else if (id) {
        console.log("HAS ID")
        // Only fetch by ID if nothing else is present
        if (query === "" && !hasFilters) {
          await fetchMovieById()
        }
      } else if (IS_BROWSER && key) {
        console.log("BROWSER ONES")
        // Fetch stored playlist movies from localStorage
        const storedMovies = JSON.parse(localStorage.getItem(key) as string)
        setMovies(storedMovies)
      } else {
        console.log("DEFAULTINGS")
        // If nothing is applied, fetch default or all movies
        await fetchMoviesByQuery() // Adjust if you have a different endpoint for default movies
      }
    }

    handleFetch()
  }, [filter, id, key, query, page])

  useEffect(() => {
    // Reset page to 1 when the query or filters change (or query is cleared)
    if (page !== 1 && (query !== "" || haveFiltersBeenSelected)) {
      setPage(1)
    } else if (query === "" && page !== 1) {
      setPage(1)
    }
  }, [query, filter, haveFiltersBeenSelected])

  useEffect(() => {
    // Only fetch by ID and genre if the query is empty and no filters are applied
    const hasFilters = filter && Object.keys(filter).length > 0 // Check if filters are applied

    if (defaultMovieDetails && formattedCastMembers && !query && !hasFilters) {
      fetchMoviesByIdAndGenre()
    }
  }, [defaultMovieDetails, formattedCastMembers, query, page, filter])

  return (
    <main className="grid grid-flow-row grid-rows-2 mobileXL:grid-rows-none mobileXL:grid-cols-3">
      <div className="rounded-xl m-3 mobileL:overflow-x overflow-x-none bg-neutral-500 h-[calc(100vh-75px)] flex flex-col">
        <div className={`${alignmentStyles} ml-3 mt-3 mr-2`}>
          <Search setQuery={setQuery} />

          <div className="m-auto mobileL:mr-1 mobileXL:h-10 h-max flex ml-0">
            <button type="button" className={`w-10 ${buttonStyles}`} disabled={page === 1} onClick={() => setPage(prev => prev - 1)}>
              <FontAwesomeIcon
                className={`h-5 w-5 text-white flex m-auto ${transitionStyles} ${page === 1 ? "opacity-0" : "opacity-100"}`}
                icon={faArrowLeft}
                aria-hidden="true"
              />
            </button>

            <button
              type="button"
              className={`w-10 ${buttonStyles}`}
              disabled={movies && movies.length < 20}
              onClick={() => setPage(prev => prev + 1)}
            >
              <FontAwesomeIcon
                className={`h-5 w-5 text-white flex m-auto ${transitionStyles}
                   ${movies && movies.length < 20 ? "opacity-0" : "opacity-100"}
                   `}
                icon={faArrowRight}
                aria-hidden="true"
              />
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
