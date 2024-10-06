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
  ageRating,
  overview,
  title,
  tags
}) => {
  const { directorTags, starringTags, genreTags, languageTags } = tags || {}

  const isRuntimeValid = runtime != null && runtime !== 0

  const isAnEnglishMovie = originCountry?.includes("GB") || originCountry?.includes("US")

  const isFromMoreThanFiveCountries = originCountry && originCountry.length > 5
  const truncateOriginalCountries = isFromMoreThanFiveCountries ? originCountry.slice(0, 5) : originCountry

  const isTitleIdenticalToOriginalTitle = title === originalTitle

  const determineAgeRating = () => {
    const countriesPriority = ["GB", "US"]

    let matchingCountryIndex = -1

    // Check if the origin country exists and is valid
    if (originCountry?.[0]) {
      matchingCountryIndex = ageRating?.results.findIndex(country => country.iso_3166_1 === originCountry[0]) || -1
    }

    // If no match found in the origin country, check the other countries in order of priority
    if (matchingCountryIndex === -1) {
      matchingCountryIndex = ageRating?.results.findIndex(country => countriesPriority.includes(country.iso_3166_1)) || -1
    }

    // Ensure the matchingCountryIndex is valid
    if (matchingCountryIndex === -1) return undefined

    // Get the release date index for the matching country
    const releaseDateIndex = ageRating?.results[matchingCountryIndex].release_dates.findIndex(release => release.certification !== "")

    // If no valid certification is found, return undefined
    if (releaseDateIndex === undefined || releaseDateIndex === -1) return undefined

    const certification = ageRating?.results[matchingCountryIndex].release_dates[releaseDateIndex].certification

    // Handle the exception for US cases
    if (originCountry?.[0] === "US" && certification === "NR") {
      // Check for GB rating if US rating is "NR"
      const gbIndex = ageRating?.results.findIndex(country => country.iso_3166_1 === "GB") || 0

      // Ensure gbIndex is valid
      if (gbIndex !== -1) {
        const gbReleaseDateIndex = ageRating?.results[gbIndex].release_dates.findIndex(release => release.certification !== "")

        // If a valid GB certification is found, return it
        if (gbReleaseDateIndex !== undefined && gbReleaseDateIndex !== -1) {
          return ageRating?.results[gbIndex].release_dates[gbReleaseDateIndex].certification
        }
      }

      // If no GB rating available, return "NR"
      return "NR"
    }

    return certification
  }

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

  const separator = <span className="opacity-20 font-semibold px-4 select-none">|</span>

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

          {isRuntimeValid && (
            <>
              <p>{`${runtime.toString()} min`}</p>
              {separator}
            </>
          )}

          {determineAgeRating() && (
            <>
              <p>{determineAgeRating()}</p>
              {separator}
            </>
          )}

          {originCountry && (
            <span className="flex gap-4 text-3xl select-none">
              {truncateOriginalCountries?.map(country => (
                <span key={country}>{getCountryEmoji({ countryCode: country, width: 30, height: 29, marginRight: "0" })}</span>
              ))}
              {isFromMoreThanFiveCountries ? <span className="text-sm m-auto">...</span> : ""}
            </span>
          )}
        </div>
      </div>

      {/* <div className="overflow-y-auto max-h-[16rem] pr-2">{overview}</div> */}
      <div className="overflow-y-auto max-h-[9rem] pr-2 w-[33rem]">{overview}</div>

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
