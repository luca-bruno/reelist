import { FC } from "react"
import Image from "next/image"
import fallbackPlaceholderWide from "@/public/fallbackPlaceholderWide.jpg"
import { TMDB_IMAGE_PATH } from "@/constants"
import MovieSelectionPaneBackgroundTypes from "./types/MovieSelectionPaneBackground.interface"

const MovieSelectionPaneBackground: FC<MovieSelectionPaneBackgroundTypes> = ({
  title,
  background,
  blurBackdrop
  // ,
  // hasBackgroundImageReturnedError,
  // setHasBackgroundImageReturnedError,
  // hasReturnedError,
  // setHasReturnedError
}) => (
  <>
    <Image
      unoptimized
      className={`select-none w-auto h-auto filter z-0 mobileXL:block hidden ${blurBackdrop ? "blur" : ""}`}
      // TODO: img fallbacks
      // src={hasBackgroundImageReturnedError ? fallbackPlaceholderWide : background || ""}
      src={background ? `${TMDB_IMAGE_PATH}${background}` : fallbackPlaceholderWide}
      alt={`${title || "Movie"} background`}
      // onError={() => setHasBackgroundImageReturnedError(true)}
      sizes="100vw"
      width={0}
      height={0}
      style={{ height: "55%", width: "100%", objectFit: "cover" }}
      draggable={false}
    />
    <Image
      unoptimized
      className={`select-none w-auto h-auto filter z-0 mobileXL:hidden block ${blurBackdrop ? "blur" : ""}`}
      // TODO: img fallbacks
      // src={hasReturnedError ? fallbackPlaceholderWide : iconLarge || iconSmall || ""}
      src={background ? `${TMDB_IMAGE_PATH}${background}` : fallbackPlaceholderWide}
      alt={`${title || "Movie"} background`}
      // onError={() => setHasReturnedError(true)}
      sizes="100vw"
      width={0}
      height={0}
      style={{ height: "55%", width: "100%", objectFit: "cover" }}
      draggable={false}
    />
  </>
)

export default MovieSelectionPaneBackground
