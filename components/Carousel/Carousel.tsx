/* eslint-disable no-nested-ternary */

"use client"

import { FC, useEffect, useState } from "react"
import { transitionStyles } from "@/helpers"
import Link from "next/link"
import { movieTypes } from "@/types/movie.interface"
import { IS_BROWSER } from "@/constants"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronRight } from "@fortawesome/free-solid-svg-icons/faChevronRight"
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus"
import { faX } from "@fortawesome/free-solid-svg-icons/faX"
import Marquee from "react-fast-marquee"
import CarouselItem from "./CarouselItem"
import { CarouselTypes } from "./types/Carousel.interface"

const Carousel: FC<CarouselTypes> = ({ title, subtitle, list, listKey, playlists, setPlaylists, queryParams }) => {
  const isCustomPlaylist =
    title !== "Get Started" &&
    title !== "Jump Back In" &&
    title !== "Your Latest Search" &&
    title !== "Your Favourites ❤️" &&
    title !== "Watchlist 🍿"

  const [overrideList, setOverrideList] = useState<movieTypes[] | undefined>(list)
  const [isHoveringOnCarousel, setIsHoveringOnCarousel] = useState(false)

  const isLatestSearchCarousel = title === "Your Latest Search"
  const shouldScroll = overrideList && overrideList?.length > 5

  useEffect(() => {
    if (IS_BROWSER && listKey) {
      const storedSelectedPlaylistMovies = JSON.parse(localStorage.getItem(listKey) as string)

      if (storedSelectedPlaylistMovies) {
        setOverrideList(storedSelectedPlaylistMovies)
      }
    }
  }, [listKey])

  // TODO: move to helper?
  const deletePlaylist = () => {
    const playlistPostDeletion = playlists?.filter(item => item !== title) || []

    localStorage.setItem("custom-playlists", JSON.stringify(playlistPostDeletion))
    localStorage.removeItem(title)

    setPlaylists?.(playlistPostDeletion)
  }

  return (
    <div
      className={`mb-12 ${transitionStyles}`}
      onMouseEnter={() => setIsHoveringOnCarousel(true)}
      onMouseLeave={() => setIsHoveringOnCarousel(false)}
    >
      <h3 className="text-3xl font-medium text-accent-500 my-4">
        {title} {subtitle}
        {isCustomPlaylist && isHoveringOnCarousel && (
          <button type="button" onClick={() => deletePlaylist()}>
            <FontAwesomeIcon icon={faX} className={`text-lg mx-4 flex items-center hover:text-accent-300 ${transitionStyles}`} />
          </button>
        )}
      </h3>
      <div className="w-full relative flex h-[361px] gap-4">
        {overrideList && overrideList?.length > 1 ? (
          <Marquee pauseOnHover play={shouldScroll} speed={30} delay={1} className="py-[10px]">
            {overrideList?.map(({ id, poster_path: posterPath, title: movieTitle }) => (
              <div key={id} className="flex-shrink-0 mx-2 first-of-type::ml-0 last-of-type::mr-0">
                <CarouselItem {...{ id, posterPath, title: movieTitle }} />
              </div>
            ))}
          </Marquee>
        ) : (
          <div className="justify-center items-center m-auto text-accent-500 text-xl">You have no movies in this playlist - browse and add some!</div>
        )}

        <Link
          href={listKey ? (isLatestSearchCarousel ? "browse" : "browse/playlist/[listKey]") : "browse"}
          as={listKey ? (isLatestSearchCarousel ? `browse?${queryParams}` : `browse/playlist/${listKey}`) : "browse"}
        >
          <button
            type="button"
            className={`bg-accent-200 rounded-md h-full w-full px-5 hover:bg-accent-500 ${transitionStyles}
            ${overrideList && overrideList?.length > 1 ? "" : "h-[361px] w-[80px] ml-0"}`}
          >
            <FontAwesomeIcon
              className="h-10 w-10 text-background-500 m-auto"
              icon={overrideList && overrideList?.length > 1 ? faChevronRight : faPlus}
              aria-hidden="true"
            />
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Carousel
