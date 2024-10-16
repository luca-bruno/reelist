"use client"

import { FC, useEffect, useState } from "react"
import Image from "next/image"
import useImage from "@/hooks/useImage/useImage"
import { addToPlaylist, transitionStyles } from "@/helpers"
import fallbackPlaceholder from "@/public/fallbackPlaceholder.jpg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck, faHeart, faHeartCirclePlus, faPlus } from "@fortawesome/free-solid-svg-icons"
import { HEADERS_ALLOW_ORIGIN, IS_BROWSER, TMDB_IMAGE_PATH } from "@/constants"
import { movieTypes } from "@/types/movie.interface"
import Skeleton from "react-loading-skeleton" // Import Skeleton component
import MovieCardType from "./types/MovieCard.interface"
import "react-loading-skeleton/dist/skeleton.css" // Optional CSS styles for skeleton

const MovieCard: FC<MovieCardType> = ({ id, title, posterPath, setSelectedMovieId, selectedMovieId }) => {
  const [favourites, setFavourites] = useState<movieTypes[]>()
  const [watchlist, setWatchlist] = useState<movieTypes[]>()

  const unaddedStyles = "hover:bg-red-300 bg-red-500"
  const alreadyAddedStyles = "hover:bg-gray-300 bg-gray-500"

  const {
    hasImageLoaded,
    setHasImageLoaded,
    // hasReturnedError,
    // setHasReturnedError
  } = useImage()

  useEffect(() => {
    if (IS_BROWSER) {
      const storedFavourites = localStorage.getItem("Favourites")
      const storedWatchlist = localStorage.getItem("Watchlist")

      if (storedFavourites) setFavourites(JSON.parse(storedFavourites))
      if (storedWatchlist) setWatchlist(JSON.parse(storedWatchlist))
    }
  }, [])

  const isMovieInPlaylist = (playlist?: movieTypes[]) => playlist && playlist.some(playlistItem => playlistItem?.id === id)

  const handleAddToPlaylist = async (e: React.MouseEvent<SVGSVGElement, MouseEvent>, listKey: string) => {
    e.stopPropagation()

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/movie?id=${id}`, HEADERS_ALLOW_ORIGIN)
    const movieDetails = await response.json()

    addToPlaylist(listKey, movieDetails, true)

    if (listKey === "Favourites") setFavourites(JSON.parse(localStorage.getItem(listKey) as string))
    if (listKey === "Watchlist") setWatchlist(JSON.parse(localStorage.getItem(listKey) as string))
  }

  const onCurrentId = (key: number) => selectedMovieId === key

  return (
    <button
      type="button"
      className={`relative grid transition-transform duration-300 ease-in-out ${onCurrentId(id) ? "scale-105" : ""} hover:scale-105`}
      onClick={() => setSelectedMovieId(id)}
    >
      <div
        className="relative rounded-xl overflow-hidden flex justify-center items-center"
        style={{ width: "calc(200px - 2rem)", height: "calc(300px - 1.5rem - 1.5rem)" }}
      >
        {!hasImageLoaded && (
          <Skeleton
            height={300}
            width={200}
            enableAnimation
            className="absolute top-0 left-0 rounded-xl"
            highlightColor="#d6d6d6"
            style={{
              width: "calc(200px - 2rem)",
              height: "calc(300px - 1.5rem - 1.5rem)"
            }}
          />
        )}

        <Image
          unoptimized
          className={`rounded-xl select-none transition-opacity duration-300 ease-in-out ${
            hasImageLoaded ? "opacity-100" : "opacity-0"
          } absolute top-0 left-0`}
          src={posterPath ? `${TMDB_IMAGE_PATH}${posterPath}` : fallbackPlaceholder}
          onError={() => {
            // TODO: handle error
          }}
          onLoadingComplete={() => setHasImageLoaded(true)}
          alt={`${title || "Movie"} icon`}
          width={200}
          height={300}
          draggable={false}
        />
      </div>

      <div className="absolute bottom-[-10px] right-[-5px] flex gap-2">
        <FontAwesomeIcon
          icon={!isMovieInPlaylist(favourites) ? faHeartCirclePlus : faHeart}
          className={`${!isMovieInPlaylist(favourites) ? unaddedStyles : alreadyAddedStyles} rounded-full p-2 ${transitionStyles}`}
          onClick={e => handleAddToPlaylist(e, "Favourites")}
        />
        <FontAwesomeIcon
          icon={!isMovieInPlaylist(watchlist) ? faPlus : faCheck}
          className={`${!isMovieInPlaylist(watchlist) ? unaddedStyles : alreadyAddedStyles} rounded-full p-2 ${transitionStyles}`}
          onClick={e => handleAddToPlaylist(e, "Watchlist")}
        />
      </div>
    </button>
  )
}

export default MovieCard
