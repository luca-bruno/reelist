import { FC } from "react"
import Image from "next/image"
import Link from "next/link"
import { transitionStyles } from "@/helpers"
import { TMDB_IMAGE_PATH } from "@/constants"
import fallbackPlaceholder from "@/public/fallbackPlaceholder.jpg"
import useImage from "@/hooks/useImage/useImage"
import Skeleton from "react-loading-skeleton"
import { CarouselItemTypes } from "./types/Carousel.interface"

const CarouselItem: FC<CarouselItemTypes> = ({ id, posterPath, title }) => {
  const { hasImageLoaded, setHasImageLoaded } = useImage()

  return (
    <Link href="browse/[id]" as={`browse/${id}`}>
      <div className={`rounded-xl my-3 overflow-hidden w-[200px] h-[300px] flex-shrink-0 relative hover:scale-105 ${transitionStyles}`}>
        {!hasImageLoaded && (
          <Skeleton height={300} width={200} enableAnimation className="absolute top-0 left-0 rounded-xl" highlightColor="#d6d6d6" />
        )}

        <Image
          unoptimized
          id={id as unknown as string}
          className={`rounded-xl cursor-pointer w-[200px] h-[300px]
            ${hasImageLoaded ? "opacity-100" : "opacity-0"}
            select-none`}
          src={posterPath ? `${TMDB_IMAGE_PATH}${posterPath}` : fallbackPlaceholder}
          onLoad={() => setHasImageLoaded(true)}
          alt={`${title || "Movie"} icon`}
          width={200}
          height={300}
          draggable={false}
        />
      </div>
    </Link>
  )
}

export default CarouselItem
