/* eslint-disable import/prefer-default-export */

// NOTE: For fetching from client components
export async function GET(request: Request) {
  const clientIpAddress = request.headers.get("x-forwarded-for")

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
      // Authorization: `Bearer ${process.env.TMDB_BEARER_TOKEN}`
    }
  }

  try {
    const response = await fetch(`https://ipapi.co/${clientIpAddress}/json/`, options)
    const data = (await response.json()) as any

    return new Response(JSON.stringify(data))
  } catch (error) {
    return new Response(JSON.stringify({ error }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    })
  }
}
