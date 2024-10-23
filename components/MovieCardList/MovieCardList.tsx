import { FC, useEffect, useRef, useState } from "react"
import MovieCardListTypes from "./types/MovieCardList.interface"
import MovieCard from "./MovieCard"
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner"

const MovieCardList: FC<MovieCardListTypes> = ({ selectedMovieId, movies, isDisplayingGridView = true }) => {
  const [isLoading, setIsLoading] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (movies && movies.length > 0) {
      setIsLoading(false)
    }
  }, [movies])

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0
    }
  }, [movies])

  return isLoading ? (
    <LoadingSpinner
      width={30}
      height={30}
      styles={{
        opacity: "50%",
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    />
  ) : (
    <div
      ref={containerRef}
      className={`grid m-3 gap-6 p-2 overflow-y-scroll flex-grow overflow-x-hidden
        ${isDisplayingGridView ? "mobileL:grid-cols-5 mobileXL:grid-cols-2 grid-cols-2" : "grid-cols-1"}
      `}
      style={{ scrollbarWidth: "thin" }}
    >
      {movies?.map(({ id, poster_path: posterPath, title }) => (
        <MovieCard
          key={id}
          {...{
            id,
            title,
            posterPath,
            selectedMovieId
          }}
        />
      ))}
    </div>
  )
}

export default MovieCardList
