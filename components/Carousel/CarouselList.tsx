"use client"

import { FC, useEffect, useState } from "react"
import { IS_BROWSER } from "@/constants"
import Carousel from "./Carousel"
import { CarouselListTypes } from "./types/Carousel.interface"

const CarouselList: FC<CarouselListTypes> = ({ movies }) => {
  const [hasUserPreviouslyVisited, setHasUserPreviouslyVisited] = useState(false)
  const [hasFavourites, setHasFavourites] = useState(false)
  const [hasWatchlist, setHasWatchlist] = useState(false)
  const [latestSearchTerm, setLatestSearchTerm] = useState<string>()
  const [playlists, setPlaylists] = useState<string[]>([])
  const [queryParams, setQueryParams] = useState<string>()

  useEffect(() => {
    if (IS_BROWSER) {
      const storedHasUserPreviouslyVisited = localStorage.getItem("has-user-previously-visited")
      const hasStoredFavourites = (JSON.parse(localStorage.getItem("Favourites") as string) || []).length > 0

      const hasStoredWatchlist = (JSON.parse(localStorage.getItem("Watchlist") as string) || []).length > 0

      const storedLatestSearchTerm = localStorage.getItem("latest-search-term")
      const storedPlaylists = JSON.parse(localStorage.getItem("custom-playlists") as string)

      const storedQueryParams = localStorage.getItem("Latest Search Results")

      if (storedHasUserPreviouslyVisited) setHasUserPreviouslyVisited(true)
      if (hasStoredFavourites) setHasFavourites(true)
      if (hasStoredWatchlist) setHasWatchlist(true)
      if (storedLatestSearchTerm) setLatestSearchTerm(storedLatestSearchTerm)
      if (storedPlaylists) setPlaylists(storedPlaylists)
      if (storedQueryParams) setQueryParams(storedQueryParams)
    }
  }, [])

  return (
    <>
      <Carousel
        {...{
          title: hasUserPreviouslyVisited ? "Jump Back In" : "Get Started",
          subtitle: hasUserPreviouslyVisited ? "– with the latest and hottest picks! ️‍🔥" : "– pick a movie and start browsing! 👋",
          list: movies
        }}
      />

      {hasUserPreviouslyVisited && (
        <>
          {hasFavourites && <Carousel {...{ title: "Your Favourites ❤️", listKey: "Favourites" }} />}

          {hasWatchlist && <Carousel {...{ title: "Watchlist 🍿", listKey: "Watchlist" }} />}

          {latestSearchTerm && (
            <Carousel
              {...{
                title: "Your Latest Search",
                subtitle: `– "${latestSearchTerm}" 🔍`,
                listKey: "Latest Search Results",
                queryParams
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
