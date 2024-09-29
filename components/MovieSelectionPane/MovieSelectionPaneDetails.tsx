import { FC } from "react"
import { getCountryEmoji } from "@/helpers"
import moment from "moment"
import MovieSelectionPaneDetailsTypes from "./types/MovieSelectionPaneDetails.interface"
import Tags from "../Tags"

const MovieSelectionPaneDetails: FC<MovieSelectionPaneDetailsTypes> = ({
  originCountry,
  originalTitle,
  runtime,
  releaseDate,
  overview,
  title,
  tags
}) => {
  const { languageTags, genreTags } = tags || {}

  const isRuntimeValid = runtime !== 0

  const isAnEnglishMovie = originCountry?.includes("GB") || originCountry?.includes("US")

  const isTitleIdenticalToOriginalTitle = title === originalTitle

  const truncationStyles: React.CSSProperties = {
    width: "100%",
    textOverflow: "ellipsis",
    whiteSpace: "normal",
    overflow: "hidden",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: "2",
    boxSizing: "border-box"
  }

  const separator = <span className="opacity-20 font-semibold px-4">|</span>

  return (
    <>
      <h1
        className="laptop:text-4xl tablet:text-4xl text-3xl pr-4 mb-2 laptopL:w-full
          laptop:w-[70%] tablet:w-[50%] mobileXL:w-[70%] w-full flex-wrap"
        style={{ textShadow: "8px 6px 16px rgba(0, 0, 0, 1)" }}
      >
        {title}
      </h1>

      {!isAnEnglishMovie && !isTitleIdenticalToOriginalTitle && (
        <h2 className="text-xl font-semibold" style={truncationStyles}>
          {originalTitle}
        </h2>
      )}

      <div>
        <div className="flex flex-row items-center">
          {releaseDate && (
            <>
              <p>{moment(releaseDate, "YYYY-MM-DD").year()}</p>
              {separator}
            </>
          )}

          {runtime && (
            <>
              <p
                className={`${isRuntimeValid ? "" : "opacity-0"}`}
              >{`${runtime?.toString()} min`}</p>
              {separator}
            </>
          )}

          {originCountry && (
            <span className="flex gap-4 text-3xl select-none">
              {originCountry?.map(country => (
                <span className="mx-1.5" key={country}>
                  {getCountryEmoji(country)}
                </span>
              ))}
            </span>
          )}
        </div>
      </div>

      <div className="overflow-y-auto max-h-[16rem] pr-2">{overview}</div>

      <div className="laptop:block pt-2 hidden">
        {languageTags && <Tags {...{ tags: languageTags }} />}
        {genreTags && <Tags {...{ tags: genreTags }} />}
      </div>
    </>
  )
}

export default MovieSelectionPaneDetails
