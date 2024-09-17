"use client"

import React, { useState } from "react"
import { faList, faGrip, faFilter } from "@fortawesome/free-solid-svg-icons"
import GameCardList from "../GameCardList"
import GameSelectionPane from "../GameSelectionPane"
import defaultSelectedGameId from "./data"
import Search from "../Search"
import Filter from "../Filter"
import ClearFiltersButton from "../ClearFiltersButton"
import ViewToggleButton from "../ToggleButton"

const Browse = () => {
  const [selectedGameId, setSelectedGameId] = useState(defaultSelectedGameId)
  const [isDisplayingGridView, setIsDisplayingGridView] = useState(true)
  const [isDisplayingFilters, setIsDisplayingFilters] = useState(true)
  const [query, setQuery] = useState("")
  const [selectedProviderFilters, setSelectedProviderFilters] = useState<string[]>([])
  const [selectedCategoryFilters, setSelectedCategoryFilters] = useState<string[]>([])
  const [selectedFeatureFilters, setSelectedFeatureFilters] = useState<string[]>([])
  const [selectedThemeFilters, setSelectedThemeFilters] = useState<string[]>([])

  const haveFiltersBeenSelected =
    selectedProviderFilters.length > 0 ||
    selectedCategoryFilters.length > 0 ||
    selectedFeatureFilters.length > 0 ||
    selectedThemeFilters.length > 0

  const clearFilters = () => {
    setSelectedProviderFilters([])
    setSelectedCategoryFilters([])
    setSelectedFeatureFilters([])
    setSelectedThemeFilters([])
  }

  const alignmentStyles = "flex justify-start items-start"
  const filterWrapperStyles =
    "text-black laptopM:[&>*:not(:first-child)]:mx-2 mobileXL:[&>*:not(:first-child)]:mx-0 [&>*:not(:first-child)]:mx-2 laptopM:mr-1 mx-0 mr-3"

  return (
    <>
      {/* <p className="text-content-500">
    Select a movie!
    </p> */}
      <div className="rounded-xl m-3 mobileL:overflow-x overflow-x-none bg-neutral-500">
        <div className={`${alignmentStyles} ml-3 mt-3 mr-2`}>
          <Search setQuery={setQuery} />

          {/* TODO: save to session after each api call - Search term - save title and poster */}

          <div className="m-auto mobileL:mr-1 mobileXL:h-10 h-max flex ml-0">
            <ViewToggleButton
              state={isDisplayingGridView}
              stateSetter={setIsDisplayingGridView}
              onIcon={faList}
              offIcon={faGrip}
            />

            {/* FilterToggleButton */}
            <ViewToggleButton
              state={isDisplayingFilters}
              stateSetter={setIsDisplayingFilters}
              onIcon={faFilter}
            />

            {/* <span className="laptop:flex mobileXL:hidden flex">
            <ClearFiltersButton
              clearFilters={clearFilters}
              haveFiltersBeenSelected={haveFiltersBeenSelected}
            />
          </span> */}
          </div>
        </div>










        <div
          className={`ml-3 mt-3 ${alignmentStyles} ${filterWrapperStyles} flex-row mobileXL:flex-col laptopM:flex-row`}
        >
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

        <div
          className={`ml-3 mt-0 ${alignmentStyles} ${filterWrapperStyles} flex-row mobileXL:flex-col laptopM:flex-row`}
        >
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
          {...{
            setSelectedGameId,
            selectedGameId,
            isDisplayingGridView,
            query,
            selectedProviderFilters,
            selectedCategoryFilters,
            selectedFeatureFilters,
            selectedThemeFilters
          }}
        />
      </div>

      <GameSelectionPane selectedGameId={selectedGameId} />
    </>
  )
}

export default Browse
