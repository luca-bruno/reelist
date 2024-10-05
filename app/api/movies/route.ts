/* eslint-disable import/prefer-default-export */
import fetchMovies from "@/services/fetchMovies/fetchMovies"

// NOTE: For fetching from client components
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const searchTerm = searchParams.get("q") || ""
  const genreTerm = searchParams.get("g") || ""
  const castTerm = searchParams.get("c") || ""
  const yearTerm = searchParams.get("y") || ""
  const pageTerm = searchParams.get("p") || ""
  const originCountryTerm = searchParams.get("oc") || ""
  const originalLanguageTerm = searchParams.get("l") || ""

  try {
    const movies = await fetchMovies(searchTerm, genreTerm, castTerm, yearTerm, pageTerm, originCountryTerm, originalLanguageTerm)
    return new Response(JSON.stringify(movies))
  } catch (error) {
    return new Response(JSON.stringify({ error }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    })
  }
}
