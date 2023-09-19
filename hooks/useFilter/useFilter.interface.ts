import { dataTypes } from "@/json/data.interface"

interface useFilterTypes {
    data: dataTypes[]
    query: string
    selectedProviderFilters: string[]
    selectedCategoryFilters: string[]
    selectedFeatureFilters: string[]
    selectedThemeFilters: string[]
}

export default useFilterTypes