/* eslint-disable import/prefer-default-export */
import fetchPerson from "@/services/fetchPerson/fetchPerson"

// NOTE: For fetching from client components
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id") || ""

  try {
    const person = await fetchPerson(id)
    return new Response(JSON.stringify(person))
  } catch (error) {
    return new Response(JSON.stringify({ error }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    })
  }
}
