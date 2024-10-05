export const IS_BROWSER = typeof window !== "undefined"

// TODO: retire eventually
export const HEADERS_ALLOW_ORIGIN = {
  headers: { "Access-Control-Allow-Origin": "*" }
}

export const SWR_FETCHER = (url: string, options: RequestInit = {}) =>
  fetch(url, { ...options, headers: { ...options.headers, "Access-Control-Allow-Origin": "*" } }).then(res => res.json())

export const TMDB_IMAGE_PATH = "https://image.tmdb.org/t/p/original/"
