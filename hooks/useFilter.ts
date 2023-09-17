import { useMemo } from "react"
import { dataTypes } from "@/json/data.interface"

const useFilter = 
({ data, query, selectedProviderFilters, selectedCategoryFilters, selectedFeatureFilters, selectedThemeFilters }: 
    { data: dataTypes[], query: string, selectedProviderFilters: string[],
        selectedCategoryFilters: string[],
        selectedFeatureFilters: string[], selectedThemeFilters: string[]}) => {

    // TODO: can probably make a map of them all and parse them by key to avoid redundant code

    const combinedFilter = useMemo(() => {
    let searchResults = data.filter(({ name }) =>
      name.toLowerCase().includes(query.toLowerCase())
    )

    if (selectedProviderFilters.length > 0) {
        searchResults = searchResults.filter(({ provider_title: providerTitle }) =>
        selectedProviderFilters.some(filter =>
            providerTitle.toLowerCase().includes(filter.toLowerCase()))
    )}
    if (selectedCategoryFilters.length > 0) {
       searchResults = searchResults.filter(({ categories }) =>
            categories.some(tagId => selectedCategoryFilters.includes(tagId))
    )}

    if (selectedFeatureFilters.length > 0) {
       searchResults = searchResults.filter(({ features }) =>
            features.some(tagId => selectedFeatureFilters.includes(tagId))
    )}

    if (selectedThemeFilters.length > 0) {
       searchResults = searchResults.filter(({ themes }) =>
            themes.some(tagId => selectedThemeFilters.includes(tagId))
    )}

    return searchResults
  }, [data, query, selectedProviderFilters, selectedCategoryFilters, selectedFeatureFilters, selectedThemeFilters])

    return {
        combinedFilter
    }
}

export default useFilter