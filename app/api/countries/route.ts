/* eslint-disable import/prefer-default-export */
import fetchCountries from "@/services/fetchCountries/fetchCountries"

// NOTE: For fetching from SWR custom hook/client components
export async function GET() {
  try {
    const countries = await fetchCountries()
    return new Response(JSON.stringify(countries))
  } catch (error) {
    return new Response(JSON.stringify({ error }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    })
  }
}
