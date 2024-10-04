import { countriesTypes } from "@/types/movie.interface"

// NOTE: For fetching from server components
const fetchCountries = async () => {
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

  const url = `${baseUrl}configuration/countries?api_key=${process.env.TMDB_API_KEY}`

  try {
    const response = await fetch(url, options)
    const data = (await response.json()) as countriesTypes

    return data
  } catch (error) {
    return error
    // TODO: Test error handling ruin API key
  }
}

export default fetchCountries
