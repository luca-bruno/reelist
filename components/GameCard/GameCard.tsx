import React, { useState } from "react"
import Image from "next/image"
import fallbackPlaceholderIcon from "./data"
import GameCardType from "./types/GameCard.interface"

const GameCard: React.FC<GameCardType> = ({ name, iconSmall }) => {
    const [hasImageLoaded, setHasImageLoaded] = useState(false)
    const [hasReturnedError, setHasReturnedError] = useState(false)

    return (
        <button type="button" className="relative h-[69.46px] w-[98.6px]">
            <Image
                className={`rounded-xl hover:scale-105 transition ease-in-out duration-200 
                    ${hasImageLoaded ? "opacity-100" : "opacity-0"}`}
                src={hasReturnedError ? fallbackPlaceholderIcon : iconSmall}
                onError={() => setHasReturnedError(true)}
                onLoadingComplete={() => setHasImageLoaded(true)}
                alt={name}
                width={hasReturnedError ? undefined : 200}
                height={hasReturnedError ? undefined : 155}
                fill={!!hasReturnedError}
                objectFit={hasReturnedError ? "cover" : undefined}
            />
        </button>
    )
}

export default GameCard