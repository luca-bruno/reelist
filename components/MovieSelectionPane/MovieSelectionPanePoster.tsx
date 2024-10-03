import { FC } from "react"
import Image from "next/image"
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
    className={`absolute right-8 bottom-3 transform m-auto mobileXL:flex mobileXL:flex-col hidden
        ${hasImageLoaded ? "opacity-100" : "opacity-0"}
    `}
  >
    {/* TODO: img fallbacks */}
    <Image
      unoptimized
      className="rounded-xl select-none slide_fade_from_left"
      // src={hasReturnedError ? "" : iconLarge || iconSmall || ""}
      src={`${TMDB_IMAGE_PATH}${poster}`}
      alt={`${title || "Movie"} poster`}
      onError={() => setHasReturnedError(true)}
      onLoadingComplete={() => setHasImageLoaded(true)}
      width={228}
      height={315}
      draggable={false}
    />

    {watchProviders && <MovieSelectionPaneProviders {...{ watchProviders }} />}
  </div>
)

export default MovieSelectionPanePoster
