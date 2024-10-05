/* eslint-disable import/prefer-default-export */
import fetchLanguages from "@/services/fetchLanguages/fetchLanguages"

// NOTE: For fetching from client components
export async function GET() {
  try {
    const languages = await fetchLanguages()
    return new Response(JSON.stringify(languages))
  } catch (error) {
    return new Response(JSON.stringify({ error }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    })
  }
}
