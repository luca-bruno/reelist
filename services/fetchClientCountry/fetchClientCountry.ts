import { moviesTypes } from "@/types/movies.interface"

const fetchClientCountry = async () => {
  const url = "/api/country"

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

export default fetchClientCountry
