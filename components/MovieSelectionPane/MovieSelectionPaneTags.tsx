import GameTags from "../GameTags"
import { FC } from "react"
import MovieSelectionPaneTagsTypes from "./types/MovieSelectionPaneTags.interface"

const MovieSelectionPaneTags: FC<MovieSelectionPaneTagsTypes> = ({
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
