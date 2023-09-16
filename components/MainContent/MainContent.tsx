"use client"

import React, { useState } from "react"
import GameCardList from "../GameCardList"
import GameSelectionPane from "../GameSelectionPane"
import defaultSelectedGameId from "./data"

const MainContent = () => {
    const [selectedGameId, setSelectedGameId] = useState(defaultSelectedGameId)

    return (
        <>
            <GameCardList setSelectedGameId={setSelectedGameId} selectedGameId={selectedGameId} />
            <GameSelectionPane selectedGameId={selectedGameId} />
        </>
    )
}

export default MainContent