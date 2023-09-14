"use client"

import React, { useState } from "react"
import data from "@/json/data.json"
import GameCard from "../GameCard"

const GameCardList = () => {
    const [selectedGame, setSelectedGame] = useState<string>()

    return (
        <div className="bg-blue-500 rounded-xl overflow-y-scroll m-3">
            <div className="grid grid-cols-4 m-3 mr-8 gap-3">
                {data.map(({ id, name, icon_2: iconSmall }) => (
                    <GameCard key={id} {...{ name, iconSmall }} />
                ))}
            </div>
        </div>
    )
}

export default GameCardList