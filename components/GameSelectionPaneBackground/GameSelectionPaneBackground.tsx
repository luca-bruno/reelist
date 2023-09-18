import React from "react"
import Image from "next/image"
import fallbackPlaceholderIcon from "../GameCard/data"
import GameSelectionPaneBackgroundTypes from "./types/GameSelectionPaneBackground.interface"


const GameSelectionPaneBackground: React.FC<GameSelectionPaneBackgroundTypes> =
    ({
        name,
        background,
        hasBackgroundImageReturnedError,
        setHasBackgroundImageReturnedError
    }) => (
        <Image
            className="filter blur-sm z-0"
            src={hasBackgroundImageReturnedError ? fallbackPlaceholderIcon : background || ""}
            alt={`${name} background` || "Game background"}
            onError={() => setHasBackgroundImageReturnedError(true)}
            quality={50}
            fill
        />
    )

export default GameSelectionPaneBackground