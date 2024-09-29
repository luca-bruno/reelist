/* eslint-disable import/prefer-default-export */
import { SUCCESSFUL_HEADERS_RESPONSE } from "@/constants"
import fetchMovie from "@/services/fetchMovie/fetchMovie"

// NOTE: For fetching from client components
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const searchTerm = searchParams.get("id") || ""

  try {
    const movie = await fetchMovie(searchTerm)
    return new Response(JSON.stringify(movie), SUCCESSFUL_HEADERS_RESPONSE)
  } catch (error) {
    return new Response(JSON.stringify({ error }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    })
  }
}

// Handle OPTIONS request for CORS preflight
export function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: SUCCESSFUL_HEADERS_RESPONSE.headers // Send CORS headers for preflight requests
  })
}
