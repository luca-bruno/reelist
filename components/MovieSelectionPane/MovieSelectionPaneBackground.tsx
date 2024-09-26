import { FC } from "react"
import Image from "next/image"
import fallbackPlaceholder from "@/public/fallbackPlaceholder.jpg"
import { TMDB_IMAGE_PATH } from "@/constants"
import MovieSelectionPaneBackgroundTypes from "./types/MovieSelectionPaneBackground.interface"

const MovieSelectionPaneBackground: FC<MovieSelectionPaneBackgroundTypes> = ({
  title,
  background,
  hasBackgroundImageReturnedError,
  setHasBackgroundImageReturnedError,
  hasReturnedError,
  setHasReturnedError
}) => (
  <>
    <Image
      className="filter blur-sm z-0 mobileXL:block hidden"
      // TODO: img fallbacks
      // src={hasBackgroundImageReturnedError ? fallbackPlaceholder : background || ""}
      src={`${TMDB_IMAGE_PATH}${background}`}
      alt={`${title || "Movie"} background`}
      onError={() => setHasBackgroundImageReturnedError(true)}
      fill
      style={{ objectFit: "cover" }}
      draggable={false}
    />
    <Image
      className="filter blur-sm z-0 mobileXL:hidden block"
      // TODO: img fallbacks
      // src={hasReturnedError ? fallbackPlaceholder : iconLarge || iconSmall || ""}
      src={`${TMDB_IMAGE_PATH}${background}`}
      alt={`${title || "Movie"} background`}
      onError={() => setHasReturnedError(true)}
      fill
      style={{ objectFit: "cover" }}
      draggable={false}
    />
  </>
)

export default MovieSelectionPaneBackground
