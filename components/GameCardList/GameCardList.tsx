"use client"

import React, { useEffect, useState } from "react"
import data from "@/json/data.json"
import useFilter from "@/hooks/useFilter/useFilter"
import { dataTypes } from "@/json/data.interface"
import GameCard from "../GameCard"
import GameCardListTypes from "./types/GameCardList.interface"


const GameCardList: React.FC<GameCardListTypes> = ({
    setSelectedGameId,
    selectedGameId,
    isDisplayingGridView,
    query,
    selectedProviderFilters,
    selectedCategoryFilters,
    selectedFeatureFilters,
    selectedThemeFilters
}) => {
    const [gameCardsData, setGameCardsData] = useState<dataTypes[]>(data)
    const { combinedFilter } = useFilter({
      data,
      query,
      selectedProviderFilters,
      selectedCategoryFilters,
      selectedFeatureFilters,
      selectedThemeFilters
    })

    useEffect(() => {
      setGameCardsData(combinedFilter)
    }, [combinedFilter])

    return (
      <div className={`grid m-3 gap-3
        ${isDisplayingGridView ? "grid-cols-2 laptopM:grid-cols-4" : "grid-cols-1"}`}
      >
        {gameCardsData.map(({ id, name, icon_2: iconSmall }) => (
          <GameCard key={id} {...{ id, name, iconSmall, setSelectedGameId, selectedGameId, isDisplayingGridView }} />
        ))}
      </div>
    )
    }

export default GameCardList