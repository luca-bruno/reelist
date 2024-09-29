import { FC } from "react"
import Image from "next/image"
import Link from "next/link"
import { transitionStyles } from "@/helpers"
import { TMDB_IMAGE_PATH } from "@/constants"
import { CarouselItemTypes } from "./types/Carousel.interface"

const CarouselItem: FC<CarouselItemTypes> = ({ id, posterPath, title }) => (
  <Link href="browse/[id]" as={`browse/${id}`} legacyBehavior>
    <Image
      id={id as unknown as string}
      className={`rounded-xl ${transitionStyles} hover:scale-105 cursor-pointer m-3`}
      // TODO: add image fallbacks
      //    ${hasImageLoaded ? "opacity-100" : "opacity-0"}
      //    ${onCurrentId(id) ? "scale-105" : ""}
      src={`${TMDB_IMAGE_PATH}${posterPath}`}
      // onError={() => setHasReturnedError(true)}
      // onLoadingComplete={() => setHasImageLoaded(true)}
      alt={`${title || "Movie"} icon`}
      width={200}
      height={155}
      draggable={false}
    />
  </Link>
)

export default CarouselItem