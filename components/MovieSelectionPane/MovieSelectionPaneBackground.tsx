import { FC } from "react"
import Image from "next/image"
import fallbackPlaceholderWide from '@/public/fallbackPlaceholderWide.jpg';
import { TMDB_IMAGE_PATH } from "@/constants"
import MovieSelectionPaneBackgroundTypes from "./types/MovieSelectionPaneBackground.interface"

const MovieSelectionPaneBackground: FC<MovieSelectionPaneBackgroundTypes> = ({
  title,
  background
  // ,
  // hasBackgroundImageReturnedError,
  // setHasBackgroundImageReturnedError,
  // hasReturnedError,
  // setHasReturnedError
}) => (
  <>
    <Image
      unoptimized
      className="select-none filter z-0 mobileXL:block hidden"
      // TODO: img fallbacks
      // src={hasBackgroundImageReturnedError ? fallbackPlaceholderWide : background || ""}
      src={background ? `${TMDB_IMAGE_PATH}${background}`: fallbackPlaceholderWide}
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
      className="select-none filter z-0 mobileXL:hidden block"
      // TODO: img fallbacks
      // src={hasReturnedError ? fallbackPlaceholderWide : iconLarge || iconSmall || ""}
      src={background ? `${TMDB_IMAGE_PATH}${background}`: fallbackPlaceholderWide}
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
