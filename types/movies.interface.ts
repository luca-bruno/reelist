import { movieTypes } from "./movie.interface"

export interface moviesTypes {
  page: number
  results: movieTypes[]
  total_pages: number
  total_results: number
}
