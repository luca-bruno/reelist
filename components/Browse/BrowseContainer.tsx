import { FC } from "react"
import { HEADERS_ALLOW_ORIGIN } from "@/constants"
import { GenresProvider } from "@/context/GenresContext"
import { CountriesProvider, LanguagesProvider } from "@/context"
import {
  fetchMoviesByFiltersAndQuery,
  fetchMoviesByFiltersOnly,
  fetchMoviesByQuery,
  fetchMoviesById,
  fetchMoviesByIdAndGenre
} from "@/components/Browse/utils/fetchMoviesByCondition"
import { formatGenres, formatCountries, formatLanguages } from "@/components/Browse/utils/formatFilterPayloads"
import { filterParamTypes } from "@/types/filter.interface"
import Browse from "./Browse"
import { BrowseContainerTypes } from "./types/BrowseContainer.interface"

const BrowseContainer: FC<BrowseContainerTypes> = async ({ params, searchParams }) => {
  let movies = []
  let defaultMovieDetails = null

  const { id, playlistKey } = params || {}
  const { query, year, genres, language, countries, page } = searchParams || {}

  // Build filters dynamically based on searchParams
  const filters: filterParamTypes = {}

  if (year) filters.year = year
  if (genres) filters.genres = genres
  if (language) filters.original_language = language
  if (countries) filters.origin_country = countries

  const hasFilters = Object.keys(filters).length > 0
  const hasQuery = !!(query && query.trim() !== "")

  // Server-side fetching logic based on conditions
  if (hasQuery && hasFilters) {
    movies = await fetchMoviesByFiltersAndQuery(filters, query, page || "1")
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

    const formattedCastMembers = defaultMovieDetails?.credits?.cast.map((castMember: { id: number }) => castMember.id).join("|")

    if (defaultMovieDetails && formattedCastMembers && !query && !hasFilters) {
      movies = await fetchMoviesByIdAndGenre(formattedCastMembers, defaultMovieDetails, page || "1")
    }
  } else {
    movies = await fetchMoviesByQuery("", page || "1")
  }

  const [genresResponse, countriesResponse, languagesResponse] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/genres`, { headers: HEADERS_ALLOW_ORIGIN.headers, cache: "force-cache" }),
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/countries`, { headers: HEADERS_ALLOW_ORIGIN.headers, cache: "force-cache" }),
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/languages`, { headers: HEADERS_ALLOW_ORIGIN.headers, cache: "force-cache" })
  ])

  const [{ genres: genresResponseData }, countriesResponseData, languagesResponseData] = await Promise.all([
    genresResponse.json(),
    countriesResponse.json(),
    languagesResponse.json()
  ])

  const formattedGenres = formatGenres(genresResponseData)
  const formattedCountries = formatCountries(countriesResponseData)
  const formattedLanguages = formatLanguages(languagesResponseData)

  return (
    <LanguagesProvider languages={formattedLanguages}>
      <CountriesProvider countries={formattedCountries}>
        <GenresProvider genres={formattedGenres}>
          <Browse {...{ movies, defaultMovieDetails, playlistKey, hasFilters, query, hasQuery }} />
        </GenresProvider>
      </CountriesProvider>
    </LanguagesProvider>
  )
}

export default BrowseContainer