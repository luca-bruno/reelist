/* eslint-disable import/prefer-default-export */
import fetchMovie from "@/services/fetchMovie/fetchMovie"

// NOTE: For fetching from client components
export async function GET(request: Request) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.TMDB_BEARER_TOKEN}`
    }
  }

  try {
    const response = await fetch("https://ipapi.co/json/", options)
    const data = (await response.json()) as any

    return new Response(JSON.stringify(data))
  } catch (error) {
    return new Response(JSON.stringify({ error }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    })
  }
}
