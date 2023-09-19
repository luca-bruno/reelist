import React from "react"
import Image from "next/image"
import fallbackPlaceholder from "@/public/fallbackPlaceholder.jpg"
import GameSelectionPaneBackgroundTypes from "./types/GameSelectionPaneBackground.interface"

const GameSelectionPaneBackground: React.FC<GameSelectionPaneBackgroundTypes> = ({
  name,
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
      src={hasBackgroundImageReturnedError ? fallbackPlaceholder : background || ""}
      alt={`${name || "Game"} background`}
      onError={() => setHasBackgroundImageReturnedError(true)}
      fill
      style={{objectFit:"cover"}}
    />
    <Image
      className="filter blur-sm z-0 mobileXL:hidden block"
      src={hasReturnedError ? fallbackPlaceholder : iconLarge || iconSmall || ""}
      alt={`${name || "Game"} background`}
      onError={() => setHasReturnedError(true)}
      fill
      style={{objectFit:"cover"}}
    />
  </>
)

export default GameSelectionPaneBackground
