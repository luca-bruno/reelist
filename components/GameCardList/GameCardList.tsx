"use client"

import React, { useState } from "react"
import GameCard from "../GameCard"

const GameCardList = () => {
    const [selectedGame, setSelectedGame] = useState<string>()

    return (
        <div className="bg-blue-500 rounded-xl overflow-y-auto m-3">
            <div className="grid grid-cols-4 m-3 gap-2">
                <GameCard />
            </div>
        </div>
    )
}

export default GameCardList