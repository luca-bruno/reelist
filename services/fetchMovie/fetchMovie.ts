import { moviesTypes } from "@/types/movies.interface"

// NOTE: For fetching from server components
const fetchMovie = async (searchTerm?: string) => {
  const baseUrl = "https://api.themoviedb.org/3/"
  const searchQuery = `movie/${searchTerm}`

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.TMDB_BEARER_TOKEN}`
    }
  }

  const url = `${baseUrl}${searchQuery}?api_key=${process.env.TMDB_API_KEY}&append_to_response=credits,release_dates,watch/providers`
  try {
    const response = await fetch(url, options)
    const data = (await response.json()) as moviesTypes

    return data
  } catch (error) {
    return error
    // TODO: Test error handling ruin API key
  }
}

export default fetchMovie
