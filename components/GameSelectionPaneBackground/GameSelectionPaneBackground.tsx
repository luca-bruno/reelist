import React from "react"
import Image from "next/image"
import fallbackPlaceholder from "@/public/fallbackPlaceholder.jpg"
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
            src={hasBackgroundImageReturnedError ? fallbackPlaceholder : background || ""}
            alt={`${name} background` || "Game background"}
            onError={() => setHasBackgroundImageReturnedError(true)}
            fill
        />
    )

export default GameSelectionPaneBackground