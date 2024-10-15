import { movieTypes } from "@/types/movie.interface"

export interface BrowseTypes {
  movies: movieTypes[]
  defaultMovieDetails?: movieTypes
  playlistKey?: string
  query?: string
  hasFilters?: boolean
  hasQuery?: boolean
}
