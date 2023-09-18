"use client"

import React, { useEffect, useState } from "react"
import data from "@/json/data.json"
import useFilter from "@/hooks/useFilter"
import { dataTypes } from "@/json/data.interface"
import GameCard from "../GameCard"
import GameCardListTypes from "./types/GameCardList.interface"

const GameCardList: React.FC<GameCardListTypes> =
    ({
        setSelectedGameId,
        selectedGameId,
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
            <div className="grid grid-cols-4 m-3 gap-3">
                {gameCardsData.map(({ id, name, icon_2: iconSmall }) => (
                    <GameCard key={id} {...{ id, name, iconSmall, setSelectedGameId, selectedGameId }} />
                ))}
            </div>
        )
    }

export default GameCardList