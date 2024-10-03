import { moviesTypes } from "@/types/movies.interface"

const fetchCountries = async () => {
  const url = "https://restcountries.com/v3.1/all?fields=name,cca2"

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    }
  }

  try {
    const response = await fetch(url, options)
    const data = (await response.json()) as moviesTypes

    return data
  } catch (error) {
    return error
    // TODO: Test error handling ruin API key
  }
}

export default fetchCountries
