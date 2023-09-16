"use client"

import React from "react"
import data from "@/json/data.json"
import GameCard from "../GameCard"
import GameCardListTypes from "./types/GameCardList.interface"

const GameCardList: React.FC<GameCardListTypes> = ({ setSelectedGameId, selectedGameId }) => (
    <div className="rounded-xl overflow-y-scroll m-3">
        <div className="grid grid-cols-4 m-3 gap-3">
            {data.map(({ id, name, icon_2: iconSmall }) => (
                <GameCard key={id} {...{ id, name, iconSmall, setSelectedGameId, selectedGameId }} />
            ))}
        </div>
    </div>
)

export default GameCardList