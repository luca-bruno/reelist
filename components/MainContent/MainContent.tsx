"use client"

import React, { useState } from "react"
import GameCardList from "../GameCardList"
import GameSelectionPane from "../GameSelectionPane"
import defaultSelectedGameId from "./data"
import Search from "../Search"
import Filter from "../Filter"
import ClearFiltersButton from "../ClearFiltersButton"

const MainContent = () => {
    const [selectedGameId, setSelectedGameId] = useState(defaultSelectedGameId)
    const [query, setQuery] = useState("")
    const [selectedProviderFilters, setSelectedProviderFilters] = useState<string[]>([])
    const [selectedCategoryFilters, setSelectedCategoryFilters] = useState<string[]>([])
    const [selectedFeatureFilters, setSelectedFeatureFilters] = useState<string[]>([])
    const [selectedThemeFilters, setSelectedThemeFilters] = useState<string[]>([])

    const haveFiltersBeenSelected = selectedProviderFilters.length > 0 || selectedCategoryFilters.length > 0 ||
    selectedFeatureFilters.length > 0 || selectedThemeFilters.length > 0

    const clearFilters = () => {
        setSelectedProviderFilters([])
        setSelectedCategoryFilters([])
        setSelectedFeatureFilters([])
        setSelectedThemeFilters([])
    }

    const alignmentStyles = "ml-3 mt-3 flex justify-start items-start"
    const filterWrapperStyles = "text-black [&>*:not(:first-child)]:mx-2"

    return (
        <>
            <div className="rounded-xl overflow-y-scroll m-3">
                <div className={`${alignmentStyles}`}>
                    <Search setQuery={setQuery} />
                    {haveFiltersBeenSelected && <ClearFiltersButton clearFilters={clearFilters} />}
                </div>

                <div className={`${alignmentStyles} ${filterWrapperStyles}`}>
                    <Filter
                        {...{
                            type: "Providers",
                            selectedFilters: selectedProviderFilters,
                            setSelectedFilters: setSelectedProviderFilters
                        }}
                    />
                    <Filter
                        {...{
                            type: "Categories",
                            selectedFilters: selectedCategoryFilters,
                            setSelectedFilters: setSelectedCategoryFilters
                        }}
                    />
                </div>

                <div className={`${alignmentStyles} ${filterWrapperStyles}`}>
                    <Filter
                        {...{
                            type: "Features",
                            selectedFilters: selectedFeatureFilters,
                            setSelectedFilters: setSelectedFeatureFilters
                        }}
                    />
                    <Filter
                        {...{
                            type: "Themes",
                            selectedFilters: selectedThemeFilters,
                            setSelectedFilters: setSelectedThemeFilters
                        }}
                    />
                </div>

                <GameCardList
                    setSelectedGameId={setSelectedGameId}
                    selectedGameId={selectedGameId}
                    query={query}
                    selectedProviderFilters={selectedProviderFilters}
                    selectedCategoryFilters={selectedCategoryFilters}
                    selectedFeatureFilters={selectedFeatureFilters}
                    selectedThemeFilters={selectedThemeFilters}
                />
            </div>
            <GameSelectionPane selectedGameId={selectedGameId} />
        </>
    )
}

export default MainContent