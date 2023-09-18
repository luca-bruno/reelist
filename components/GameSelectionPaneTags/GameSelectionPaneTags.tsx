import React from "react"
import GameTags from "../GameTags"
import GameSelectionPaneTagsTypes from "./types/GameSelectionPaneTags.interface"


const GameSelectionPaneTags: React.FC<GameSelectionPaneTagsTypes> = ({ categoryTags, featureTags, themeTags }) => (
    <div className="mt-6 w-[80%]">
        {categoryTags && <GameTags tags={categoryTags} />}
        {featureTags && <GameTags tags={featureTags} />}
        {themeTags && <GameTags tags={themeTags} />}
    </div>
)

export default GameSelectionPaneTags