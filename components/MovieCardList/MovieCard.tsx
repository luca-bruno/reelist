"use client"

import { FC, useEffect, useState } from "react"
import Image from "next/image"
import useImage from "@/hooks/useImage/useImage"
import { addToPlaylist, transitionStyles } from "@/helpers"
// import fallbackPlaceholder from "@/public/fallbackPlaceholder.jpg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck, faHeart, faHeartCirclePlus, faPlus } from "@fortawesome/free-solid-svg-icons"
import { HEADERS_ALLOW_ORIGIN, IS_BROWSER, TMDB_IMAGE_PATH } from "@/constants"
import { movieTypes } from "@/types/movie.interface"
import MovieCardType from "./types/MovieCard.interface"

const MovieCard: FC<MovieCardType> = ({ id, title, posterPath, setSelectedMovieId, selectedMovieId, isDisplayingGridView = true }) => {
  const [favourites, setFavourites] = useState<movieTypes[]>()
  const [watchlist, setWatchlist] = useState<movieTypes[]>()

  const unaddedStyles = "hover:bg-red-300 bg-red-500"
  const alreadyAddedStyles = "hover:bg-gray-300 bg-gray-500"

  const {
    hasImageLoaded,
    setHasImageLoaded,
    // hasReturnedError,
    setHasReturnedError
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
      className={`movie-card__button relative m-auto ${
        !isDisplayingGridView
          ? `rounded-xl laptop:h-[80px] h-[40px] flex
            ${transitionStyles} hover:scale-105 mx-2 bg-gray-50/10`
          : ""
      }`}
      onClick={() => setSelectedMovieId(id)}
    >
      <Image
        unoptimized
        className={`rounded-xl select-none ${transitionStyles}
              ${!isDisplayingGridView ? "my-auto h-full w-auto" : "hover:scale-105"}
              ${hasImageLoaded ? "opacity-100" : "opacity-0"} 
              ${onCurrentId(id) ? "scale-105" : ""}
            `}
        // TODO: add img fallbacks
        // src={hasReturnedError ? fallbackPlaceholder : posterPath}
        src={`${TMDB_IMAGE_PATH}${posterPath}`}
        onError={() => setHasReturnedError(true)}
        onLoadingComplete={() => setHasImageLoaded(true)}
        alt={`${title || "Movie"} icon`}
        width={200}
        height={155}
        draggable={false}
      />

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

      {!isDisplayingGridView && <div className="px-2 m-auto laptopM:text-2xl laptop:text-lg mobileXL:text-sm text-[0.7rem] truncate">{title}</div>}
    </button>
  )
}

export default MovieCard
