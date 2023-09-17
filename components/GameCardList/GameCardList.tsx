"use client"

import React, { useEffect, useState } from "react"
import data from "@/json/data.json"
import useFilter from "@/hooks/useFilter"
import GameCard from "../GameCard"
import GameCardListTypes from "./types/GameCardList.interface"

const GameCardList: React.FC<GameCardListTypes> = ({ setSelectedGameId, selectedGameId, query }) => {
    const [gameCardsData, setGameCardsData] = useState(data)
    const { filteredBySearch } = useFilter({ data, query })

    useEffect(() => {
        setGameCardsData(filteredBySearch)
    }, [filteredBySearch])

    return (
        <div className="grid grid-cols-4 m-3 gap-3">
            {gameCardsData.map(({ id, name, icon_2: iconSmall }) => (
                <GameCard key={id} {...{ id, name, iconSmall, setSelectedGameId, selectedGameId }} />
            ))}
        </div>
    )
}

export default GameCardList