import React, { useEffect, useState } from "react"
import { dataTypes } from "@/json/data.interface"
import data from "@/json/data.json"
import useImage from "@/hooks/useImage"
import GameSelectionPaneBackground from "../GameSelectionPaneBackground"
import GameSelectionPaneCover from "../GameSelectionPaneCover"
import GameSelectionPanePlayButton from "../GameSelectionPanePlayButton"
import GameSelectionPaneDetails from "../GameSelectionPaneDetails"
import GameSelectionPaneTags from "../GameSelectionPaneTags"

const GameSelectionPane: React.FC<{ selectedGameId: string }> = ({ selectedGameId }) => {
    const [selectedGame, setSelectedGame] = useState<dataTypes>()
    const { 
        hasImageLoaded, 
        setHasImageLoaded,
        hasReturnedError,
        setHasReturnedError,
        hasBackgroundImageReturnedError, 
        setHasBackgroundImageReturnedError 
    } = useImage()

    const {
        name,
        provider_title: providerTitle,
        icon_2: iconSmall,
        icon_3: iconLarge,
        background,
        cats: categoryTags,
        feats: featureTags,
        thms: themeTags
    } = selectedGame || {}

    useEffect(() => {
        setSelectedGame(data.filter(game => game.id === selectedGameId)[0])
        setHasImageLoaded(false)
        setHasReturnedError(false)
        setHasBackgroundImageReturnedError(false)
    }, [selectedGameId, setHasBackgroundImageReturnedError, setHasImageLoaded, setHasReturnedError])

    return (
        <div className="flex justify-center col-span-2 rounded-xl overflow-y-auto m-3 overflow-hidden" >
            <div className="relative h-full w-full">
                <GameSelectionPaneBackground
                    {...{
                        name,
                        background,
                        hasBackgroundImageReturnedError,
                        setHasBackgroundImageReturnedError
                    }}
                />

                <div className="bg-gradient-to-b from-transparent from-1% to-gray-500
                    p-3 absolute bottom-0 rounded-xl z-10 w-full h-[35%]"
                >
                    <GameSelectionPaneCover
                        {...{
                            name,
                            hasImageLoaded,
                            setHasImageLoaded,
                            hasReturnedError,
                            setHasReturnedError,
                            iconLarge,
                            iconSmall
                        }}
                    />

                    <GameSelectionPanePlayButton />

                    <div className="p-5">
                        {name && providerTitle && <GameSelectionPaneDetails {...{ name, providerTitle }} />}
                        <GameSelectionPaneTags {...{ categoryTags, featureTags, themeTags }} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GameSelectionPane