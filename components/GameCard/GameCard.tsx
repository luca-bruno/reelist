import React from "react"
import Image from "next/image"
import useImage from "@/hooks/useImage"
import { transitionStyles } from "@/helpers"
import fallbackPlaceholder from "@/public/fallbackPlaceholder.jpg"
import GameCardType from "./types/GameCard.interface"


const GameCard: React.FC<GameCardType> = ({ id, name, iconSmall, setSelectedGameId, selectedGameId, isDisplayingGridView }) => {
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
            className={`relative ${!isDisplayingGridView ? `rounded-xl h-[140px] flex ${transitionStyles} hover:scale-105 mx-2 bg-gray-50/10` : ""}`}
            onClick={() => setSelectedGameId(id)}
        >
            <Image
                className={`rounded-xl ${transitionStyles}
                    ${!isDisplayingGridView ? "my-auto h-full" : "hover:scale-105"}
                    ${hasImageLoaded ? "opacity-100" : "opacity-0"} 
                    ${onCurrentId(id) ? "scale-105" : ""}
                `}
                src={hasReturnedError ? fallbackPlaceholder : iconSmall}
                onError={() => setHasReturnedError(true)}
                onLoadingComplete={() => setHasImageLoaded(true)}
                alt={name}
                width={200}
                height={155}
            />

            { !isDisplayingGridView &&
                <div className="m-auto text-2xl">
                    {name}
                </div>
            }
        </button>
    )
}

export default GameCard