import React from "react"
import Image from "next/image"
import GameSelectionPaneCoverTypes from "./types/GameSelectionPaneCover.interface"


const GameSelectionPaneCover: React.FC<GameSelectionPaneCoverTypes> =
    ({
        name,
        hasImageLoaded,
        setHasImageLoaded,
        hasReturnedError,
        setHasReturnedError,
        iconLarge,
        iconSmall
    }) => (
        <div className={`justify-center m-auto items-center mobileXL:flex hidden ${hasImageLoaded ? "opacity-100" : "opacity-0"}`}>
            <Image
                className="absolute rounded-xl py-3 px-8 right-0"
                src={hasReturnedError ? "" : (iconLarge || iconSmall) || ""}
                alt={`${name || "Game"} icon`}
                onError={() => setHasReturnedError(true)}
                onLoadingComplete={() => setHasImageLoaded(true)}
                width={250}
                height={211}
            />
        </div>

    )

export default GameSelectionPaneCover