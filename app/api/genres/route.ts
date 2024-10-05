/* eslint-disable import/prefer-default-export */
import fetchGenres from "@/services/fetchGenres/fetchGenres"

// NOTE: For fetching from client components
export async function GET() {
  try {
    const genres = await fetchGenres()
    return new Response(JSON.stringify(genres))
  } catch (error) {
    return new Response(JSON.stringify({ error }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    })
  }
}
