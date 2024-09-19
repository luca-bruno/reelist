import { movieResponseTypes } from "@/json/data.interface"

const fetchMovies = async (searchTerm?: string) => {
  const baseUrl = "https://api.themoviedb.org/3/"
  const discoverQuery = "discover/movie?" 
  const searchQuery = `search/movie?query=${searchTerm}`

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.API_KEY}`
    }
  }
  // const url = `${baseUrl}${discoverQuery}${searchQuery}${movieIdQuery}`
  const url = searchTerm ? `${baseUrl}${searchQuery}` : `${baseUrl}${discoverQuery}`


   // const url = "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc"
  // const url = `https://api.themoviedb.org/3/movie/550/images`
  // https://api.themoviedb.org/3/search/movie?query




    // get/movie/{movie_id}/watch/providers
  // &watch_region={iso_3166_1}

  try {
    const response = await fetch(url, options)
    const data = await response.json() as movieResponseTypes
    // const x = searchTerm ? data.results.sort((a, b) => b.popularity - a.popularity) : data
    return data.results.sort((a, b) => b.popularity - a.popularity)
    // return x
    // setMovies(sorted)
  } catch (error) {
    return error
    // TODO: check error handling ruin bearer
  }
    // } finally {
  //   setLoading(false)
  // }
}

export default fetchMovies