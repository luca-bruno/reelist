"use client"

import React from "react"
import Image from "next/image"
import useImage from "@/hooks/useImage/useImage"
import { transitionStyles } from "@/helpers"
import fallbackPlaceholder from "@/public/fallbackPlaceholder.jpg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck, faHeart } from "@fortawesome/free-solid-svg-icons"
import MovieCardType from "./types/MovieCard.interface"


const MovieCard: React.FC<MovieCardType> = ({ 
  id, 
  name, 
  iconSmall, 
  setSelectedMovieId, 
  selectedMovieId, 
  isDisplayingGridView = true
}) => {
  const {
    hasImageLoaded,
    setHasImageLoaded,
    hasReturnedError,
    setHasReturnedError
  } = useImage()

    const onCurrentId = (key: string) => selectedMovieId === key

    return (
        <button
          type="button"
          className={`movie-card__button relative m-auto ${!isDisplayingGridView ? `rounded-xl laptop:h-[80px] h-[40px] flex
            ${transitionStyles} hover:scale-105 mx-2 bg-gray-50/10` : ""}`}
          onClick={() => setSelectedMovieId(id)}
        >
          <Image
            className={`rounded-xl ${transitionStyles}
              ${!isDisplayingGridView ? "my-auto h-full w-auto" : "hover:scale-105"}
              ${hasImageLoaded ? "opacity-100" : "opacity-0"} 
              ${onCurrentId(id) ? "scale-105" : ""}
            `}
            // src={hasReturnedError ? fallbackPlaceholder : iconSmall}
            src={`https://image.tmdb.org/t/p/original/${iconSmall}`}
            onError={() => setHasReturnedError(true)}
            onLoadingComplete={() => setHasImageLoaded(true)}
            alt={`${name || "Movie"} icon`}
            width={200}
            height={155}
            draggable={false}
          />

          { !isDisplayingGridView &&
            <div className="px-2 m-auto laptopM:text-2xl laptop:text-lg mobileXL:text-sm text-[0.7rem] truncate">
              {name}
            </div>
          }
        </button>
    )
}

export default MovieCard