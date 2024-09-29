/* eslint-disable import/prefer-default-export */
import { SUCCESSFUL_HEADERS_RESPONSE } from "@/constants"
import promptGroq from "@/services/promptGroq/promptGroq"

// NOTE: For fetching from client components
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const movie = searchParams.get("movie") || ""

  try {
    const groqResponse = await promptGroq(movie)

    return new Response(JSON.stringify(groqResponse), SUCCESSFUL_HEADERS_RESPONSE)
  } catch (error) {
    return new Response("Error fetching genre", { status: 500 })
  }
}

// Handle OPTIONS request for CORS preflight
export function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: SUCCESSFUL_HEADERS_RESPONSE.headers // Send CORS headers for preflight requests
  })
}

