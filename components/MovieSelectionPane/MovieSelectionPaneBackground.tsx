import React from "react"
import Image from "next/image"
import fallbackPlaceholder from "@/public/fallbackPlaceholder.jpg"
import MovieSelectionPaneBackgroundTypes from "./types/MovieSelectionPaneBackground.interface"

const MovieSelectionPaneBackground: React.FC<MovieSelectionPaneBackgroundTypes> = ({
  title,
  background,
  hasBackgroundImageReturnedError,
  setHasBackgroundImageReturnedError,
  iconSmall,
  iconLarge,
  hasReturnedError,
  setHasReturnedError
}) => (
  <>
    <Image
      className="filter blur-sm z-0 mobileXL:block hidden"
      // src={hasBackgroundImageReturnedError ? fallbackPlaceholder : background || ""}
      src={`https://image.tmdb.org/t/p/original/${background}`}
      alt={`${title || "Movie"} background`}
      onError={() => setHasBackgroundImageReturnedError(true)}
      fill
      style={{objectFit:"cover"}}
      draggable={false}
    />
    <Image
      className="filter blur-sm z-0 mobileXL:hidden block"
      // src={hasReturnedError ? fallbackPlaceholder : iconLarge || iconSmall || ""}
      src={`https://image.tmdb.org/t/p/original/${background}`}
      alt={`${title || "Movie"} background`}
      onError={() => setHasReturnedError(true)}
      fill
      style={{objectFit:"cover"}}
      draggable={false}
    />
  </>
)

export default MovieSelectionPaneBackground
