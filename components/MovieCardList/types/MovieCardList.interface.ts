import { Dispatch, SetStateAction } from "react"
import { movieTypes } from "@/types/movie.interface"

interface MovieCardListTypes {
  setSelectedMovieId: Dispatch<SetStateAction<number | undefined>>
  selectedMovieId?: number
  movies?: movieTypes[]
  isDisplayingGridView: boolean
}

export default MovieCardListTypes
