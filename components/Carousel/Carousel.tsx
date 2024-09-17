import React, { FC } from "react"
import Image from "next/image"
import { faChevronRight } from "@fortawesome/free-solid-svg-icons/faChevronRight"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { transitionStyles } from "@/helpers"
import Link from "next/link"
import CarouselTypes from "./types/Carousel.interface"

const Carousel: FC<CarouselTypes> = ({ title, subtitle, list }) => (
  <div className="mb-12">
    <h3 className="text-3xl font-medium text-accent-500 my-4">{title} {subtitle}</h3>
    <div className="flex gap-8">
      {list.map(({ src, label }) =>
        <Image
          key={src}
          className={`rounded-xl ${transitionStyles} hover:scale-105 cursor-pointer`}
          //    ${hasImageLoaded ? "opacity-100" : "opacity-0"} 
          //    ${onCurrentId(id) ? "scale-105" : ""}
          src={src}
          // onError={() => setHasReturnedError(true)}
          // onLoadingComplete={() => setHasImageLoaded(true)}
          alt={`${label || "Game"} icon`}
          width={200}
          height={155}
          draggable={false}
        />
      )}


      <Link href="browse">
        <button type="button" className={`bg-accent-200 rounded-md h-full w-full mx-5 hover:bg-accent-500 ${transitionStyles}`}>
          <FontAwesomeIcon
            className="h-10 w-10 text-background-500 m-auto"
            icon={faChevronRight}
            aria-hidden="true"
          />
        </button>
      </Link>
    </div>
  </div>
)

export default Carousel