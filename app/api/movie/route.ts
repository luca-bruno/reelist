/* eslint-disable import/prefer-default-export */
import fetchMovie from "@/services/fetchMovie/fetchMovie"

// NOTE: For fetching from client components
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const searchTerm = searchParams.get("id") || ""

  try {
    const movie = await fetchMovie(searchTerm)
    return new Response(JSON.stringify(movie), {
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
