import { movieSummaryTypes, movieFullTypes } from "@/types/movies.interface"

interface useFilterTypes {
    data: (movieFullTypes & movieSummaryTypes)[]
    query: string
    selectedProviderFilters: string[]
    selectedCategoryFilters: string[]
    selectedFeatureFilters: string[]
    selectedThemeFilters: string[]
}

export default useFilterTypes