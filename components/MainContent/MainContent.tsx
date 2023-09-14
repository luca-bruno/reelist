"use client"

import React, { useState } from "react"
import GameCardList from "../GameCardList"
import GameSelectionPane from "../GameSelectionPane"

const MainContent = () => {
    const [items, setItems] = useState("")

    return (
        <>
            <GameCardList />
            <GameSelectionPane />
        </>
    )
}

export default MainContent