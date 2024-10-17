/* eslint-disable import/prefer-default-export */
import promptGroq from "@/services/promptGroq/promptGroq"

// NOTE: For fetching from client components
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const movie = searchParams.get("movie") || ""
  const taggedGenres = searchParams.get("tagged") || ""

  try {
    const groqResponse = await promptGroq(movie, taggedGenres)

    return new Response(JSON.stringify(groqResponse))
  } catch (error) {
    return new Response("Error fetching genre", { status: 500 })
  }
}
