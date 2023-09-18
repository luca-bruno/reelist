import React from "react"
import Image from "next/image"
import useImage from "@/hooks/useImage"
import fallbackPlaceholderIcon from "./data"
import GameCardType from "./types/GameCard.interface"


const GameCard: React.FC<GameCardType> = ({ id, name, iconSmall, setSelectedGameId, selectedGameId }) => {
    const {
        hasImageLoaded,
        setHasImageLoaded,
        hasReturnedError,
        setHasReturnedError
    } = useImage()

    const onCurrentId = (key: string) => selectedGameId === key

    return (
        <button
            type="button"
            className="relative"
            onClick={() => setSelectedGameId(id)}
        >
            <Image
                className={`rounded-xl hover:scale-105 transition ease-in-out duration-200 
                    ${hasImageLoaded ? "opacity-100" : "opacity-0"} ${onCurrentId(id) ? "scale-105" : ""}`}
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