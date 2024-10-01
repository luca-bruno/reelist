import { FC } from "react"
import Image from "next/image"
import { TMDB_IMAGE_PATH } from "@/constants"
import MovieSelectionPanePosterTypes from "./types/MovieSelectionPanePoster.interface"

const MovieSelectionPanePoster: FC<MovieSelectionPanePosterTypes> = ({
  title,
  hasImageLoaded,
  setHasImageLoaded,
  // hasReturnedError,
  setHasReturnedError,
  poster
}) => (
  <div
    // className={`justify-center m-auto items-center mobileXL:flex hidden ${
    className={`absolute right-8 top-3/4 transform -translate-y-3/4 m-auto mobileXL:flex mobileXL:flex-col hidden
        ${hasImageLoaded ? "opacity-100" : "opacity-0"}
    `}
  >
    {/* TODO: img fallbacks */}
    <Image
      className="rounded-xl select-none slide_fade_from_left"
      // src={hasReturnedError ? "" : iconLarge || iconSmall || ""}
      src={`${TMDB_IMAGE_PATH}${poster}`}
      alt={`${title || "Movie"} poster`}
      onError={() => setHasReturnedError(true)}
      onLoadingComplete={() => setHasImageLoaded(true)}
      width={210}
      height={315}
      draggable={false}
    />
  </div>
)

export default MovieSelectionPanePoster
