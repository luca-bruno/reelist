"use client"

import { FC, useEffect, useState } from "react"
// import { faList } from "@fortawesome/free-solid-svg-icons/faList"
// import { faGrip } from "@fortawesome/free-solid-svg-icons/faGrip"
// import { faFilter } from "@fortawesome/free-solid-svg-icons/faFilter"
import { movieTypes } from "@/types/movie.interface"
import { HEADERS_ALLOW_ORIGIN, IS_BROWSER } from "@/constants"
import Search from "../Search"
// import Filter from "../Filter"
// import ClearFiltersButton from "../ClearFiltersButton"
// import ToggleButton from "../ToggleButton"
import MovieCardList from "../MovieCardList"
import MovieSelectionPane from "../MovieSelectionPane"

// TODO: maybe use as fallback? needs testing
// const scoreMovies = (movies, currentMovie) => {
//   const scoredMovies = movies.map(movie => {
//       let score = 0

//       // Count genre matches (assuming you have genre IDs)
//       const genreMatches = movie.genre_ids.filter(genre => currentMovie.genres.includes(genre))
//       score += genreMatches.length * 2 // Higher weight for genre matches

//       // Count cast matches (assuming you have cast member IDs)
//       const castMatches = movie.cast?.filter(actor => currentMovie.cast.includes(actor))
//       score += castMatches?.length // Lower weight for cast matches

//       return { movie, score }
//   })

//   // Sort by score
//   return scoredMovies.sort((a, b) => b.score - a.score).map(item => item.movie)
// }

const Browse: FC<{ params?: { id?: string; key?: string } }> = ({ params }) => {
  const { id, key } = params || {}

  const [query, setQuery] = useState("")
  const [movies, setMovies] = useState<movieTypes[]>()
  const [defaultMovieDetails, setDefaultMovieDetails] = useState<movieTypes | undefined>()
  const [selectedMovieId, setSelectedMovieId] = useState<number>()

  const formattedCastMembers = defaultMovieDetails?.credits?.cast
    .map(castMember => castMember.id)
    .join("|")

  useEffect(() => {
    localStorage.setItem("has-user-previously-visited", "true")
  }, [])

  // const [isDisplayingGridView, setIsDisplayingGridView] = useState(true)
  // const [isDisplayingFilters, setIsDisplayingFilters] = useState(true)
  // const [selectedProviderFilters, setSelectedProviderFilters] = useState<string[]>([])
  // const [selectedCategoryFilters, setSelectedCategoryFilters] = useState<string[]>([])
  // const [selectedFeatureFilters, setSelectedFeatureFilters] = useState<string[]>([])
  // const [selectedThemeFilters, setSelectedThemeFilters] = useState<string[]>([])

  // const haveFiltersBeenSelected =
  //   selectedProviderFilters.length > 0 ||
  //   selectedCategoryFilters.length > 0 ||
  //   selectedFeatureFilters.length > 0 ||
  //   selectedThemeFilters.length > 0

  // const clearFilters = () => {
  //   setSelectedProviderFilters([])
  //   setSelectedCategoryFilters([])
  //   setSelectedFeatureFilters([])
  //   setSelectedThemeFilters([])
  // }

  const alignmentStyles = "flex justify-start items-start"
  // const filterWrapperStyles =
  //   "text-black laptopM:[&>*:not(:first-child)]:mx-2 mobileXL:[&>*:not(:first-child)]:mx-0 [&>*:not(:first-child)]:mx-2 laptopM:mr-1 mx-0 mr-3"

  useEffect(() => {
    async function fetchMovieById() {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/movie?id=${id}`,
        HEADERS_ALLOW_ORIGIN
      )
      const data = await response.json()
      setDefaultMovieDetails(data)
    }

    async function fetchMoviesByQuery() {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/movies?q=${query}`,
        HEADERS_ALLOW_ORIGIN
      )
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
      const groqGenreResponse = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/genre?movie=${defaultMovieDetails?.title}`,
        HEADERS_ALLOW_ORIGIN
      )
      const groqGenreResponseData = await groqGenreResponse.json()

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/movies?g=${groqGenreResponseData}&c=${formattedCastMembers}`,
        HEADERS_ALLOW_ORIGIN
      )
      const data = await response.json()

      const isMovieAlreadyInList = data.some(
        (movie: movieTypes) => movie.id === defaultMovieDetails?.id
      )

      setMovies(
        defaultMovieDetails && !isMovieAlreadyInList ? [defaultMovieDetails, ...data] : data
      )
    }

    if (defaultMovieDetails && formattedCastMembers && !query) {
      // Only fetch genre-based movies if we have the movie details, cast, and query is empty
      fetchMoviesByIdAndGenre()
    }
  }, [defaultMovieDetails, formattedCastMembers, query])

  return (
    <main className="grid grid-flow-row grid-rows-2 mobileXL:grid-rows-none mobileXL:grid-cols-3 h-[calc(100vh-48px)]">
      <div className="rounded-xl m-3 mobileL:overflow-x overflow-x-none bg-neutral-500">
        <div className={`${alignmentStyles} ml-3 mt-3 mr-2`}>
          <Search setQuery={setQuery} />

          {/* <div className="m-auto mobileL:mr-1 mobileXL:h-10 h-max flex ml-0">
            <ToggleButton
              state={isDisplayingGridView}
              stateSetter={setIsDisplayingGridView}
              onIcon={faList}
              offIcon={faGrip}
            />

            <ToggleButton
              state={isDisplayingFilters}
              stateSetter={setIsDisplayingFilters}
              onIcon={faFilter}
            />
          </div> */}
        </div>

        {/* <div
          className={`ml-3 mt-3 ${alignmentStyles} ${filterWrapperStyles} flex-row mobileXL:flex-col laptopM:flex-row`}
        >
          <Filter
            {...{
              type: "Providers",
              selectedFilters: selectedProviderFilters,
              setSelectedFilters: setSelectedProviderFilters
            }}
          />
          <Filter
            {...{
              type: "Categories",
              selectedFilters: selectedCategoryFilters,
              setSelectedFilters: setSelectedCategoryFilters
            }}
          />
        </div>

        <div
          className={`ml-3 mt-0 ${alignmentStyles} ${filterWrapperStyles} flex-row mobileXL:flex-col laptopM:flex-row`}
        >
          <Filter
            {...{
              type: "Features",
              selectedFilters: selectedFeatureFilters,
              setSelectedFilters: setSelectedFeatureFilters
            }}
          />
          <Filter
            {...{
              type: "Themes",
              selectedFilters: selectedThemeFilters,
              setSelectedFilters: setSelectedThemeFilters
            }}
          />
        </div> */}

        <MovieCardList
          {...{
            setSelectedMovieId,
            selectedMovieId,
            query,
            // genres,
            movies,
            isDisplayingGridView: true
            //   selectedProviderFilters,
            //   selectedCategoryFilters,
            //   selectedFeatureFilters,
            //   selectedThemeFilters
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
