import { useMemo } from "react"
import useFilterTypes from "./useFilter.interface"

const useFilter = ({
  data,
  query,
  selectedProviderFilters,
  selectedCategoryFilters,
  selectedFeatureFilters,
  selectedThemeFilters
}: useFilterTypes) => {
  const combinedFilter = useMemo(() => {
    let searchResults = data.filter(({ name }) => name.toLowerCase().includes(query.toLowerCase()))

    if (selectedProviderFilters.length > 0) {
      searchResults = searchResults.filter(({ provider_title: providerTitle }) =>
        selectedProviderFilters.some(filter =>
          providerTitle.toLowerCase().includes(filter.toLowerCase())
        )
      )
    }

    const arr = [
      {
        filterType: "categories",
        items: selectedCategoryFilters
      },
      {
        filterType: "features",
        items: selectedFeatureFilters
      },
      {
        filterType: "themes",
        items: selectedThemeFilters
      }
    ]

    arr.forEach(({ filterType, items }) => {
      if (items.length > 0) {
        searchResults = searchResults.filter(games =>
          (games[filterType as keyof typeof games] as string[])?.some(tagId =>
            items.includes(tagId)
          )
        )
      }
    })

    return searchResults
  }, [
    data,
    query,
    selectedCategoryFilters,
    selectedFeatureFilters,
    selectedProviderFilters,
    selectedThemeFilters
  ])

  return {
    combinedFilter
  }
}

export default useFilter
