import { HEADERS_ALLOW_ORIGIN } from "@/constants"
import { filterParamTypes } from "@/types/filter.interface"

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
  const queryString = buildQueryString({ query })
  // return fetchMovies(`${process.env.NEXT_PUBLIC_BASE_URL}/api/movies?q=${queryString}&p=${page}`)
  return fetchMovies(`${process.env.NEXT_PUBLIC_BASE_URL}/api/movies?${queryString}&p=${page}`)
}

// const fetchMoviesByQuery = async () => {
//   const data = await fetchMovies(`${process.env.NEXT_PUBLIC_BASE_URL}/api/movies?q=${query}&p=${page}`)
//   if (query) localStorage.setItem("Latest Search Results", JSON.stringify(data))
//   setMovies(data)
// }

export const fetchMoviesByFiltersAndQuery = async (filters: filterParamTypes, query: string, page: string) => {
  const queryString = buildQueryString({ filters, query })
  //   localStorage.setItem("Latest Search Results", JSON.stringify(filteredMovies))

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
  const queryString = buildQueryString({ filters })
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
