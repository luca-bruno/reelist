import { movieTypes } from "@/types/movie.interface"

interface MovieCardListTypes {
  selectedMovieId?: number
  movies?: movieTypes[]
  isDisplayingGridView: boolean
}

export default MovieCardListTypes
