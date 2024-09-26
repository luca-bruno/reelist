import { Dispatch, SetStateAction } from "react"
import { movieTypes } from "@/types/movie.interface"

interface MovieCardListTypes {
  setSelectedMovieId: Dispatch<SetStateAction<number | undefined>>
  selectedMovieId?: number
  query: string
  movies?: movieTypes[]
  isDisplayingGridView: boolean
  // selectedProviderFilters: string[]
  // selectedCategoryFilters: string[]
  // selectedFeatureFilters: string[]
  // selectedThemeFilters: string[]
}

export default MovieCardListTypes
