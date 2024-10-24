import { FC } from "react"
import Image from "next/image"
import { TMDB_IMAGE_PATH } from "@/constants"
import fallbackPlaceholderUser from "@/public/fallbackPlaceholderUser.jpg"

const PersonSelectionPanePoster: FC<any> = ({
  title,
  hasImageLoaded,
  setHasImageLoaded,
  // hasReturnedError,
  setHasReturnedError,
  poster
}) => (
  <div
    // className={`justify-center m-auto items-center mobileXL:flex hidden ${
    className={`transform m-auto mobileXL:flex mobileXL:flex-col hidden
        ${hasImageLoaded ? "opacity-100" : "opacity-0"}
    `}
  >
    <Image
      unoptimized
      className="rounded-xl select-none slide_fade_from_left"
      // src={hasReturnedError ? "" : iconLarge || iconSmall || ""}
      src={poster ? `${TMDB_IMAGE_PATH}${poster}` : fallbackPlaceholderUser}
      // src={`${TMDB_IMAGE_PATH}${poster}`}
      alt={`${title || "Movie"} poster`}
      onError={() => setHasReturnedError(true)}
      onLoad={() => setHasImageLoaded(true)}
      width={200}
      height={300}
      draggable={false}
    />

  </div>
)

export default PersonSelectionPanePoster
