"use client"

import React, { useState } from "react"
import GameCardList from "../GameCardList"
import GameSelectionPane from "../GameSelectionPane"
import defaultSelectedGameId from "./data"
import Search from "../Search"
import Filter from "../Filter"

const MainContent = () => {
    const [selectedGameId, setSelectedGameId] = useState(defaultSelectedGameId)
    const [query, setQuery] = useState("")

    const alignmentStyles = "ml-3 mt-3 flex justify-start items-start"

    return (
        <>
            <div className="rounded-xl overflow-y-scroll m-3">
                <div className={`${alignmentStyles}`}>
                    <Search setQuery={setQuery} />
                </div>

                <div className={`${alignmentStyles} text-black [&>*:not(:first-child)]:mx-2`}>
                    <Filter type="Providers" />
                    <Filter type="Categories" />
                </div>

                <div className={`${alignmentStyles} text-black [&>*:not(:first-child)]:mx-2`}>
                    <Filter type="Features" />
                    <Filter type="Themes" />
                </div>


                <GameCardList setSelectedGameId={setSelectedGameId} selectedGameId={selectedGameId} query={query} />
            </div>
            <GameSelectionPane selectedGameId={selectedGameId} />
        </>
    )
}

export default MainContent