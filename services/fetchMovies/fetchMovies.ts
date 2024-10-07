import { moviesTypes } from "@/types/movies.interface"

// NOTE: For fetching from server components
const fetchMovies = async (
  searchTerm?: string,
  genreTerm?: string,
  castTerm?: string,
  yearTerm?: string,
  pageTerm?: string,
  originCountryTerm?: string,
  originalLanguageTerm?: string
) => {
  const baseUrl = "https://api.themoviedb.org/3/"
  const discoverQuery = "discover/movie?"
  const searchQuery = `search/movie?query=${searchTerm}`
  const genreQuery = genreTerm ? `&with_genres=${genreTerm}` : ""
  const castQuery = castTerm ? `&with_cast=${castTerm}` : ""
  const yearQuery = yearTerm ? `&primary_release_year=${yearTerm}` : ""
  const originCountryQuery = originCountryTerm ? `&with_origin_country=${originCountryTerm}` : ""
  const originalLanguageQuery = originalLanguageTerm ? `&with_original_language=${originalLanguageTerm}` : ""
  const pageQuery = pageTerm ? `&page=${pageTerm}` : ""

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.TMDB_BEARER_TOKEN}`
    }
  }

  const url = searchTerm
    ? `${baseUrl}${searchQuery}${pageQuery}`
    : `${baseUrl}${discoverQuery}${genreQuery}${castQuery}${yearQuery}${originCountryQuery}${originalLanguageQuery}${pageQuery}`

  console.log(url)

  try {
    const response = await fetch(url, options)
    const data = (await response.json()) as moviesTypes

    // Manually sorting by popularity from non-discover (i.e. search) endpoint (since not available natively from API)
    return data.results.sort((a, b) => b.popularity - a.popularity)
  } catch (error) {
    return error
    // TODO: Test error handling ruin API key
  }
}

export default fetchMovies
