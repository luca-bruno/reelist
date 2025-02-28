import { FC } from "react"
import Image from "next/image"
import fallbackPlaceholder from "@/public/fallbackPlaceholder.jpg"
import { TMDB_IMAGE_PATH } from "@/constants"
import MovieSelectionPanePosterTypes from "./types/MovieSelectionPanePoster.interface"
import MovieSelectionPaneProviders from "./MovieSelectionPaneProviders"

const MovieSelectionPanePoster: FC<MovieSelectionPanePosterTypes> = ({
  title,
  hasImageLoaded,
  setHasImageLoaded,
  // hasReturnedError,
  setHasReturnedError,
  poster,
  watchProviders
}) => (
  <div
    // className={`justify-center m-auto items-center mobileXL:flex hidden ${
    className={`absolute right-4 top-60 mobileXL:right-8 mobileXL:bottom-3 transform m-auto mobileXL:flex mobileXL:flex-col
        ${hasImageLoaded ? "opacity-100" : "opacity-0"}
    `}
  >
    {/* TODO: img fallbacks */}
    <Image
      unoptimized
      className="rounded-xl w-[95px] h-[140px] mobileXL:w-[228px] mobileXL:h-[342px] select-none"
      // src={hasReturnedError ? "" : iconLarge || iconSmall || ""}
      src={poster ? `${TMDB_IMAGE_PATH}${poster}` : fallbackPlaceholder}
      // src={`${TMDB_IMAGE_PATH}${poster}`}
      alt={`${title || "Movie"} poster`}
      onError={() => setHasReturnedError(true)}
      onLoad={() => setHasImageLoaded(true)}
      width={228}
      height={342}
      draggable={false}
    />

    {watchProviders && 
      <div className="mobileXL:block hidden">
        <MovieSelectionPaneProviders {...{ watchProviders }} />
      </div>
    }
  </div>
)

export default MovieSelectionPanePoster
