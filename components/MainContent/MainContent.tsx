"use client"

import React, { useEffect, useState } from "react"
import GameCardList from "../GameCardList"
import GameSelectionPane from "../GameSelectionPane"
import defaultSelectedGameId from "./data"
import Search from "../Search"

const MainContent = () => {
    const [selectedGameId, setSelectedGameId] = useState(defaultSelectedGameId)
    const [query, setQuery] = useState("")

    return (
        <>
            <div className="rounded-xl overflow-y-scroll m-3">
                <Search setQuery={setQuery} />
                <GameCardList setSelectedGameId={setSelectedGameId} selectedGameId={selectedGameId} query={query} />
            </div>
            <GameSelectionPane selectedGameId={selectedGameId} />
        </>
    )
}

export default MainContent