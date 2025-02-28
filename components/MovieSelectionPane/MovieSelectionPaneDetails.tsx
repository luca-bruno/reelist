import { FC } from "react"
import MovieSelectionPaneDetailsTypes from "./types/MovieSelectionPaneDetails.interface"
import Tags from "../Tags"

const MovieSelectionPaneDetails: FC<MovieSelectionPaneDetailsTypes> = ({ overview, tags }) => {
  const { directorTags, starringTags, genreTags, languageTags } = tags || {}

  return (
    <>
      <div className="overflow-y-auto max-h-[5rem] mobileXL:max-h-[9rem] pr-2 w-auto mobileXL:w-[33rem]">{overview}</div>

      <div className="laptop:block pt-2 hidden">
        {directorTags && <Tags {...{ tags: directorTags }} />}
        {starringTags && <Tags {...{ tags: starringTags }} />}
        {genreTags && <Tags {...{ tags: genreTags }} />}
        {languageTags && <Tags {...{ tags: languageTags }} />}
      </div>
    </>
  )
}

export default MovieSelectionPaneDetails
