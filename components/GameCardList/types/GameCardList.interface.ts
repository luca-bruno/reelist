interface GameCardListTypes {
    setSelectedGameId: (arg0: string) => void 
    selectedGameId: string
    isDisplayingGridView: boolean
    query: string
    selectedProviderFilters: string[]
    selectedCategoryFilters: string[]
    selectedFeatureFilters: string[]
    selectedThemeFilters: string[]
}

export default GameCardListTypes