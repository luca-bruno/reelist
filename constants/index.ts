export const IS_BROWSER = typeof window !== "undefined"

export const SUCCESSFUL_HEADERS_RESPONSE = {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization"
    }
}

export const TMDB_IMAGE_PATH = "https://image.tmdb.org/t/p/original/"