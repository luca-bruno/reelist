import { genreTypes } from "@/types/movie.interface"

// NOTE: For fetching from server components
const fetchGenres = async () => {
  const baseUrl = "https://api.themoviedb.org/3/"

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.TMDB_BEARER_TOKEN}`
    }
  }

  const url = `${baseUrl}genre/movie/list?api_key=${process.env.TMDB_API_KEY}`

  try {
    const response = await fetch(url, options)
    const data = (await response.json()) as genreTypes

    return data
  } catch (error) {
    return error
    // TODO: Test error handling ruin API key
  }
}

export default fetchGenres
