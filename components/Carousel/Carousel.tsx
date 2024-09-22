"use client"

import { FC, useEffect, useRef, useState } from "react"
import { faChevronRight } from "@fortawesome/free-solid-svg-icons/faChevronRight"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { transitionStyles } from "@/helpers"
import Link from "next/link"
import { movieTypes } from "@/types/movie.interface"
import { IS_BROWSER } from "@/constants"
import { CarouselTypes } from "./types/Carousel.interface"
import CarouselItem from "./CarouselItem"

const Carousel: FC<CarouselTypes> = ({ title, subtitle, list, listKey }) => {
  const scrollContainerRef = useRef(null)

  const [overrideList, setOverrideList] = useState<movieTypes[]>()
  const [isHovered, setIsHovered] = useState(false)
  const [scrollAmount, setScrollAmount] = useState(0)

  // useEffect(() => {
  //   let value
  //   // Get the value from local storage if it exists
  //   value = localStorage.setItem("Favourites", JSON.stringify(movies)) || ""
  // }, [movies])

  useEffect(() => {
    if (IS_BROWSER && listKey) {
      const storedPreferences = localStorage.getItem(listKey)
      if (storedPreferences) {
        setOverrideList(JSON.parse(storedPreferences))
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
          {(overrideList || list)?.map(
            ({ id, poster_path: posterPath, title: movieTitle }) => (
              <CarouselItem key={id} {...{ id, posterPath, title: movieTitle }} />
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
