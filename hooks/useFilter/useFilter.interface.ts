import { moviesTypes } from "@/types/movies.interface"
import { movieTypes } from "@/types/movie.interface"

interface useFilterTypes {
  // data: (moviesTypes & movieTypes)[]
  data: any[]
  query: string
  selectedProviderFilters: string[]
  selectedCategoryFilters: string[]
  selectedFeatureFilters: string[]
  selectedThemeFilters: string[]
}

export default useFilterTypes
