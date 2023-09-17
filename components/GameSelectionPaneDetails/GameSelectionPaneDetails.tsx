import React from "react"
import GameSelectionPaneDetailsTypes from "./types/GameSelectionPaneDetails.interface"

const GameSelectionPaneDetails: React.FC<GameSelectionPaneDetailsTypes> = ({ name, providerTitle }) => (
    <>
        <p className="text-5xl pr-4 py-2 rounded-xl w-max"
            style={{ textShadow: "8px 6px 16px rgba(0, 0, 0, 1)" }}>
            {name}
        </p>

        <p className="text-sm">{`Provided by ${providerTitle}`}</p>
    </>
)

export default GameSelectionPaneDetails