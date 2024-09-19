interface MovieCardListTypes {
  setSelectedMovieId: (arg0: string) => void
  selectedMovieId: string
  query: string
  isDisplayingGridView: boolean
  selectedProviderFilters: string[]
  selectedCategoryFilters: string[]
  selectedFeatureFilters: string[]
  selectedThemeFilters: string[]
}

export default MovieCardListTypes
