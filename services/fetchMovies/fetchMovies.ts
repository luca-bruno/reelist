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
): Promise<moviesTypes> => {
  const baseUrl = "https://api.themoviedb.org/3/"
  const discoverQuery = "discover/movie?"
  // NOTE: Legacy (and documented search endpoint from TMDB)
  // const searchQuery = `search/movie?query=${searchTerm}`
  const searchQuery = searchTerm ? `&with_text_query=${searchTerm}` : ""
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

  // NOTE: Legacy (and documented search endpoint from TMDB)
  // const url = searchTerm ? `${baseUrl}${searchQuery}${pageQuery}` :
  const url = `${baseUrl}${discoverQuery}${searchQuery}${genreQuery}${castQuery}${yearQuery}${originCountryQuery}${originalLanguageQuery}${pageQuery}`

  console.log("url@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
  console.log(url)
  try {
    const response = await fetch(url, options)
    if (!response.ok) {
      throw new Error(`Error fetching movies: ${response.statusText}`)
    }
    const data = (await response.json()) as moviesTypes

    // If results are available, sort by popularity (can be customized)
    return data.results ? data.results.sort((a, b) => b.popularity - a.popularity) : []
  } catch (error) {
    console.error("Error fetching movies:", error)
    throw new Error("Error fetching movies") // Error handling, can also return empty array
  }
}

export default fetchMovies
