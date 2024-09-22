import { movieSummaryTypes, movieFullTypes } from "@/json/data.interface"

interface useFilterTypes {
    data: (movieFullTypes & movieSummaryTypes)[]
    query: string
    selectedProviderFilters: string[]
    selectedCategoryFilters: string[]
    selectedFeatureFilters: string[]
    selectedThemeFilters: string[]
}

export default useFilterTypes