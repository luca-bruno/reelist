/* eslint-disable import/prefer-default-export */
import promptGroq from "@/services/promptGroq/promptGroq"

// NOTE: For fetching from client components
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const movie = searchParams.get("movie") || ""

  try {
    const groqResponse = await promptGroq(movie)

    return new Response(JSON.stringify(groqResponse))
  } catch (error) {
    return new Response("Error fetching genre", { status: 500 })
  }
}

