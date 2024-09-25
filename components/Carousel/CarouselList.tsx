"use client"

import { FC, useEffect, useState } from "react"
import { IS_BROWSER } from "@/constants"
import Carousel from "./Carousel"
import { CarouselListTypes } from "./types/Carousel.interface"

const CarouselList: FC<CarouselListTypes> = ({ movies }) => {
  const [hasUserPreviouslyVisited, setHasUserPreviouslyVisited] =
    useState(false)
  const [hasFavourites, setHasFavourites] = useState(false)
  const [hasWatched, setHasWatched] = useState(false)
  const [latestSearchTerm, setLatestSearchTerm] = useState<string>()
  const [playlists, setPlaylists] = useState<string[]>([])

  useEffect(() => {
    if (IS_BROWSER) {
      const storedHasUserPreviouslyVisited = localStorage.getItem(
        "has-user-previously-visited"
      )
      const storedHasFavourites =
        (JSON.parse(localStorage.getItem("Favourites") as string) || [])
          .length > 0

      const storedHasWatched =
        (JSON.parse(localStorage.getItem("Watchlist") as string) || []).length >
        0

      const latestSearchTerm = localStorage.getItem("latest-search-term")
      const customPlaylists = localStorage.getItem("custom-playlists")

      if (storedHasUserPreviouslyVisited) setHasUserPreviouslyVisited(true)
      if (storedHasFavourites) setHasFavourites(true)
      if (storedHasWatched) setHasWatched(true)
      if (latestSearchTerm) setLatestSearchTerm(latestSearchTerm)
      if (customPlaylists) setPlaylists(JSON.parse(customPlaylists))
    }
  }, [])

  return (
    <>
      <Carousel
        {...{
          title: hasUserPreviouslyVisited ? "Jump Back In" : "Get Started",
          subtitle: hasUserPreviouslyVisited
            ? "– with the latest and hottest picks! ️‍🔥"
            : "– pick a movie and start browsing! 👋",
          list: movies
        }}
      />

      {hasUserPreviouslyVisited && (
        <>
          {hasFavourites && (
            <Carousel
              {...{ title: "Your Favourites ❤️", listKey: "Favourites" }}
            />
          )}

          {hasWatched && (
            <Carousel {...{ title: "Watchlist 🍿", listKey: "Watchlist" }} />
          )}

          {latestSearchTerm && (
            <Carousel
              {...{
                title: "Your Latest Search",
                subtitle: `– "${latestSearchTerm}" 🔍`,
                listKey: "Latest Search Results"
              }}
            />
          )}

          {playlists &&
            playlists?.map(playlist => (
              <Carousel
                key={playlist}
                {...{
                  title: playlist,
                  listKey: playlist,
                  playlists,
                  setPlaylists
                }}
              />
            ))}
        </>
      )}
    </>
  )
}

export default CarouselList
