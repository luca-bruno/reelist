import { FC } from "react"
import { movieTypes } from "@/types/movie.interface"
import { filterParamTypes } from "@/types/filter.interface"
import { HEADERS_ALLOW_ORIGIN } from "@/constants"
import Browse from "./Browse"

const buildQueryString = ({ filters, query }: { filters?: filterParamTypes; query?: string }): string => {
  const params = new URLSearchParams()

  if (query) params.append("q", query)

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
  if (!response.ok) throw new Error("Failed to fetch movies")
  return response.json()
}

// TODO: change them to not use route handlers
export const fetchMoviesById = async (id: string) => fetchMovies(`${process.env.NEXT_PUBLIC_BASE_URL}/api/movie?id=${id}`)

// const fetchMovieById = async () => {
//   const data = await fetchMovies(`${process.env.NEXT_PUBLIC_BASE_URL}/api/movie?id=${id}`)
//   setDefaultMovieDetails(data)
// }

export const fetchMoviesByQuery = async (query: string, page: string) => {
  const queryString = buildQueryString({query})
  // return fetchMovies(`${process.env.NEXT_PUBLIC_BASE_URL}/api/movies?q=${queryString}&p=${page}`)
  return fetchMovies(`${process.env.NEXT_PUBLIC_BASE_URL}/api/movies?${queryString}&p=${page}`)
}

// const fetchMoviesByQuery = async () => {
//   const data = await fetchMovies(`${process.env.NEXT_PUBLIC_BASE_URL}/api/movies?q=${query}&p=${page}`)
//   if (query) localStorage.setItem("Latest Search Results", JSON.stringify(data))
//   setMovies(data)
// }

export const fetchMoviesByFiltersAndQuery = async (filters: filterParamTypes, query: string, page: string) => {
  const queryString = buildQueryString({filters, query})

  return fetchMovies(`${process.env.NEXT_PUBLIC_BASE_URL}/api/movies?${queryString}&p=${page}`)
  // const filteredMovies = query ? data.filter((movie: movieTypes) => movie.title.toLowerCase().includes(query.toLowerCase())) : data
  // return filteredMovies
}

// const fetchMoviesByFiltersAndQuery = async () => {
//   const queryString = buildQueryString(filter as filterParamTypes)
//   const data = await fetchMovies(`${process.env.NEXT_PUBLIC_BASE_URL}/api/movies?${queryString}&p=${page}`)

//   // If there is a query, filter results based on the query term
//   const filteredMovies = query ? data.filter((movie: movieTypes) => movie.title.toLowerCase().includes(query.toLowerCase())) : data

//   localStorage.setItem("Latest Search Results", JSON.stringify(filteredMovies))
//   setMovies(filteredMovies)
// }

export const fetchMoviesByFiltersOnly = async (filters: filterParamTypes, page: string) => {
  const queryString = buildQueryString({filters})
  return fetchMovies(`${process.env.NEXT_PUBLIC_BASE_URL}/api/movies?${queryString}&p=${page}`)
}

// const fetchMoviesByFiltersOnly = async () => {
//   const queryString = buildQueryString(filter as filterParamTypes)
//   console.log("Fetching movies with filters only:", queryString) // Log the query string for filters
//   const data = await fetchMovies(`${process.env.NEXT_PUBLIC_BASE_URL}/api/movies?${queryString}&p=${page}`)
//   console.log("Fetched movies:", data) // Log the fetched movies
//   localStorage.setItem("Latest Search Results", JSON.stringify(data))
//   setMovies(data) // Set movies based on filter results
// }

export const fetchMoviesByIdAndGenre = async (formattedCastMembers: any, defaultMovieDetails: any, page: any) => {
  const genreResponse = await fetchMovies(`${process.env.NEXT_PUBLIC_BASE_URL}/api/genre?movie=${defaultMovieDetails?.title}`)
  return fetchMovies(`${process.env.NEXT_PUBLIC_BASE_URL}/api/movies?g=${genreResponse}&c=${formattedCastMembers}&p=${page}`)
}

// const fetchMoviesByIdAndGenre = async () => {
//   const isMovieInList = data?.some((movie: movieTypes) => movie.id === defaultMovieDetails?.id)
//   setMovies(defaultMovieDetails && !isMovieInList ? [defaultMovieDetails, ...data] : data)
// }

interface BrowseContainerTypes {
  params?: { id?: string; playlistKey?: string }
  searchParams?: {
    query: string
    year: string
    genres: string
    language: string
    countries: string
    page: string
  }
}

const BrowseContainer: FC<BrowseContainerTypes> = async ({ params, searchParams }) => {
  let movies = []
  let defaultMovieDetails = null

  const { id, playlistKey } = params || {}
  const { query, year, genres, language, countries, page } = searchParams || {}

  // Build filters dynamically based on searchParams
  const filters: any = {}

  if (year) filters.year = year
  if (genres) filters.genres = genres
  if (language) filters.original_language = language
  if (countries) filters.origin_country = countries

  const hasFilters = Object.keys(filters).length > 0
  const hasQuery = !!(query && query.trim() !== "")

  // Server-side fetching logic based on conditions

  // Check if both query and filters are applied
  if (hasQuery && hasFilters) {
    movies = await fetchMoviesByFiltersAndQuery(filters, query, page || "1")
    console.log(movies)
  }
  // Check if only filters are applied
  else if (hasFilters) {
    movies = await fetchMoviesByFiltersOnly(filters, page || "1")
  }
  // Check if only a search query is applied
  else if (hasQuery) {
    movies = await fetchMoviesByQuery(query, page || "1")
  } else if (id) {
    defaultMovieDetails = await fetchMoviesById(id)
    // movies = await fetchMoviesByQuery("", page || "1")
    const formattedCastMembers = defaultMovieDetails?.credits?.cast.map(castMember => castMember.id).join("|")

    if (defaultMovieDetails && formattedCastMembers && !query && !hasFilters) {
      movies = await fetchMoviesByIdAndGenre(formattedCastMembers, defaultMovieDetails, page || "1")
    }
  }
  // } else if (key) {
  //   movies = []
  // }
  // Default fetching (e.g., popular movies)
  else {
    movies = await fetchMoviesByQuery("", page || "1")
  }

  // const haveFiltersBeenSelected = filter && Object.keys(filter).length > 0

  // useEffect(() => {
  //   console.log("Fetching with Query:", query, "Filters:", filter)

  //   const handleFetch = async () => {
  //     const hasQuery = query.trim() !== "" // Checks for non-empty query
  //     const hasFilters = filter && Object.keys(filter).some(filterKey => filter[filterKey as keyof filterTypes])

  //     if (hasFilters && hasQuery) {
  //       console.log("HAS FILTERS AND HAS QUERY")
  //       // Both filters and query are present
  //       await fetchMoviesByFiltersAndQuery()
  //     } else if (hasFilters) {
  //       console.log("HAS FILTERS")
  //       // Only filters are present
  //       await fetchMoviesByFiltersOnly()
  //     } else if (hasQuery) {
  //       console.log("HAS QUERY")
  //       // Only query is present
  //       await fetchMoviesByQuery()
  //     } else if (id) {
  //       console.log("HAS ID")
  //       // Only fetch by ID if nothing else is present
  //       if (query === "" && !hasFilters) {
  //         await fetchMovieById()
  //       }
  //     } else if (IS_BROWSER && key) {
  //       console.log("BROWSER ONES")
  //       // Fetch stored playlist movies from localStorage
  //       const storedMovies = JSON.parse(localStorage.getItem(key) as string)
  //       setMovies(storedMovies)
  //     } else {
  //       console.log("DEFAULTINGS")
  //       // If nothing is applied, fetch default or all movies
  //       await fetchMoviesByQuery() // Adjust if you have a different endpoint for default movies
  //     }
  //   }

  //   handleFetch()
  // }, [filter, id, key, query, page])

  // useEffect(() => {
  //   // Reset page to 1 when the query or filters change (or query is cleared)
  //   if (page !== 1 && (query !== "" || haveFiltersBeenSelected)) {
  //     setPage(1)
  //   } else if (query === "" && page !== 1) {
  //     setPage(1)
  //   }
  // }, [query, filter, haveFiltersBeenSelected])

  // useEffect(() => {
  //   // Only fetch by ID and genre if the query is empty and no filters are applied
  //   const hasFilters = filter && Object.keys(filter).length > 0 // Check if filters are applied

  //   if (defaultMovieDetails && formattedCastMembers && !query && !hasFilters) {
  //     fetchMoviesByIdAndGenre()
  //   }
  // }, [defaultMovieDetails, formattedCastMembers, query, page, filter])

  return <Browse {...{ movies, defaultMovieDetails, playlistKey, hasFilters, query, hasQuery }} />
}

export default BrowseContainer
