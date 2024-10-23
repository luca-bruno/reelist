import { movieTypes } from "@/types/movie.interface"

interface MovieCardListTypes {
  selectedMovieId?: number | string
  movies?: movieTypes[]
  isDisplayingGridView: boolean
}

export default MovieCardListTypes
