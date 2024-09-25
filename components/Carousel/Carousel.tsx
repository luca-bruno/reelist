"use client"

import { FC, useEffect, useRef, useState } from "react"
import { CarouselTypes } from "./types/Carousel.interface"
import { transitionStyles } from "@/helpers"
import Link from "next/link"
import { movieTypes } from "@/types/movie.interface"
import { IS_BROWSER } from "@/constants"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import CarouselItem from "./CarouselItem"
import { faChevronRight } from "@fortawesome/free-solid-svg-icons/faChevronRight"

const Carousel: FC<CarouselTypes> = ({
  title,
  subtitle,
  list,
  listKey,
  playlists,
  setPlaylists
}) => {
  const isCustomPlaylist =
    title !== "Get Started" &&
    title !== "Jump Back In" &&
    title !== "Your Latest Search" &&
    title !== "Your Favourites ❤️" &&
    title !== "Watchlist 🍿"

  const [overrideList, setOverrideList] = useState<movieTypes[] | undefined>(
    list
  )
  const [isHovered, setIsHovered] = useState(false)
  const [, setScrollAmount] = useState(0)

  const scrollContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (IS_BROWSER && listKey) {
      const storedSelectedPlaylistMovies = localStorage.getItem(listKey)
      if (storedSelectedPlaylistMovies) {
        setOverrideList(JSON.parse(storedSelectedPlaylistMovies))
      }
    }
  }, [listKey])

  // This useEffect will make the carousel scroll to the right slowly
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current

    const scrollStep = () => {
      if (!isHovered && scrollContainer) {
        setScrollAmount(prev => {
          const newScrollAmount = prev + 1 // Adjust this value for speed
          scrollContainer.scrollLeft = newScrollAmount
          return newScrollAmount // Update the scroll amount
        })
      }
    }

    const intervalId = setInterval(scrollStep, 50) // Adjust the interval for smoother scrolling

    return () => clearInterval(intervalId) // Clean up on component unmount
  }, [isHovered])

  // Update scroll amount on manual scroll
  const handleScroll = () => {
    if (scrollContainerRef.current) {
      setScrollAmount(scrollContainerRef.current.scrollLeft)
    }
  }

  return (
    <div className="mb-12">
      <h3 className="text-3xl font-medium text-accent-500 my-4">
        {title} {subtitle}
      </h3>
      <div className="flex">
        <div
          ref={scrollContainerRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="flex gap-8 py-[10px] overflow-x-scroll whitespace-nowrap"
          onScroll={handleScroll} // Track manual scrolling
        >
          {overrideList?.map(
            ({ id, poster_path: posterPath, title: movieTitle }) => (
              <CarouselItem
                key={id}
                {...{ id, posterPath, title: movieTitle }}
              />
            )
          )}
        </div>
        <Link href="browse">
          <button
            type="button"
            className={`bg-accent-200 rounded-md h-full w-full mx-5 hover:bg-accent-500 ${transitionStyles}`}
          >
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
}

export default Carousel
