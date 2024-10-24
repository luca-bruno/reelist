"use client"

import { FC, useEffect, useState } from "react"
import Image from "next/image"
import useImage from "@/hooks/useImage/useImage"
import { transitionStyles } from "@/helpers"
import fallbackPlaceholder from "@/public/fallbackPlaceholder.jpg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck, faHeart, faHeartCirclePlus, faPlus } from "@fortawesome/free-solid-svg-icons"
import { HEADERS_ALLOW_ORIGIN, IS_BROWSER, TMDB_IMAGE_PATH } from "@/constants"
import { usePlaylist } from "@/context/PlaylistContext"
import { movieTypes } from "@/types/movie.interface"
import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import MovieCardType from "./types/MovieCard.interface"

const MovieCard: FC<MovieCardType> = ({ id, title, posterPath, selectedMovieId }) => {
  const [favourites, setFavourites] = useState<movieTypes[]>()
  const [watchlist, setWatchlist] = useState<movieTypes[]>()

  const pathname = usePathname()
  const searchParams = useSearchParams()

  const unaddedStyles = "hover:bg-red-300 bg-red-500"
  const alreadyAddedStyles = "hover:bg-gray-300 bg-gray-500"

  const {
    hasImageLoaded,
    setHasImageLoaded
    // hasReturnedError,
    // setHasReturnedError
  } = useImage()

  const { playlists, addToPlaylist } = usePlaylist()

  useEffect(() => {
    if (IS_BROWSER) {
      const storedFavourites = playlists.Favourites
      const storedWatchlist = playlists.Watchlist

      if (storedFavourites) setFavourites(storedFavourites)
      if (storedWatchlist) setWatchlist(storedWatchlist)
    }
  }, [playlists])

  const updatedQueryParams = new URLSearchParams(searchParams.toString())
  updatedQueryParams.set("movie", String(id))
  updatedQueryParams.delete("name")

  const isMovieInPlaylist = (playlist?: movieTypes[]) => playlist && playlist.some(playlistItem => playlistItem?.id === id)

  const handleAddToPlaylist = async (e: React.MouseEvent<SVGSVGElement, MouseEvent>, listKey: string) => {
    e.stopPropagation()

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/movie?id=${id}`, HEADERS_ALLOW_ORIGIN)
    const movieDetails = await response.json()

    addToPlaylist(listKey, movieDetails, true)

    if (listKey === "Favourites") setFavourites(JSON.parse(localStorage.getItem(listKey) as string))
    if (listKey === "Watchlist") setWatchlist(JSON.parse(localStorage.getItem(listKey) as string))
  }

  const onCurrentId = (key: number) => Number(selectedMovieId) === Number(key)

  return (
    <Link href={`${pathname}?${updatedQueryParams}`}>
      <button
        type="button"
        className={`h-auto w-auto relative transition-transform duration-300 ease-in-out 
          ${onCurrentId(id as number) ? "scale-105" : ""} hover:scale-105`}
      >
        <div
          className="relative rounded-xl overflow-hidden flex justify-center items-center"
          style={{ width: "calc(200px - 2rem)", height: "calc(300px - 1.5rem - 1.5rem)" }}
        >
          {!hasImageLoaded && (
            <Skeleton
              height={252}
              width={168}
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
            className={`rounded-xl w-[168px] h-[252px] select-none transition-opacity duration-300 ease-in-out ${
              hasImageLoaded ? "opacity-100" : "opacity-0"
            } absolute top-0 left-0`}
            src={posterPath ? `${TMDB_IMAGE_PATH}${posterPath}` : fallbackPlaceholder}
            onError={() => {
              // TODO: handle error
            }}
            onLoad={() => setHasImageLoaded(true)}
            alt={`${title || "Movie"} icon`}
            width={168}
            height={252}
            draggable={false}
          />
          <div
            className={`${transitionStyles} absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-200 text-gray-800 text-lg font-bold hover:opacity-100 opacity-0`}
          >
            {title || "No Title"}
          </div>
        </div>

        <span className="absolute bottom-[-12px] justify-end w-full flex gap-2">
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
        </span>
      </button>
    </Link>
  )
}

export default MovieCard
