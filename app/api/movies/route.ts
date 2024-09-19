/* eslint-disable import/prefer-default-export */
import fetchMovies from "@/services/fetchMovies/fetchMovies"

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const searchTerm = searchParams.get("q") || ""
  
    try {
      const movies = await fetchMovies(searchTerm)
      return new Response(JSON.stringify(movies), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      })
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      })
    }
  }