import React from "react"
import GameTags from "../GameTags"
import MovieSelectionPaneTagsTypes from "./types/MovieSelectionPaneTags.interface"

const MovieSelectionPaneTags: React.FC<MovieSelectionPaneTagsTypes> = ({
  categoryTags,
  featureTags,
  themeTags
}) => (
  <div className="mt-6 w-[70%] laptop:block hidden">
    {categoryTags && <GameTags tags={categoryTags} />}
    {featureTags && <GameTags tags={featureTags} />}
    {themeTags && <GameTags tags={themeTags} />}
  </div>
)

export default MovieSelectionPaneTags
