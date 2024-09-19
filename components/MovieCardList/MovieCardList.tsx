import React, { useEffect, useState } from "react"
import useFilter from "@/hooks/useFilter/useFilter"
import fallbackPlaceholder from "@/public/fallbackPlaceholder.jpg"
import { movieTypes } from "@/json/data.interface"
import MovieCardListTypes from "./types/MovieCardList.interface"
import MovieCard from "./MovieCard"


const MovieCardList: React.FC<MovieCardListTypes> = ({
  setSelectedMovieId,
  selectedMovieId,
  query,
  isDisplayingGridView = true,
  selectedProviderFilters,
  selectedCategoryFilters,
  selectedFeatureFilters,
  selectedThemeFilters
}) => {
  const [movies, setMovies] = useState()

  // TODO: SWR or react-query + make into custom hook
  useEffect(() => {
    async function fetchMovies() {
      const response = await fetch(`api/movies?q=${query}`)
      const data = await response.json()
      setMovies(data)
    }
    fetchMovies()
  }, [query])





  // const [gameCardsData, setGameCardsData] = useState<dataTypes[]>(data)
  // const { combinedFilter } = useFilter({
  //   data,
  //   query,
  //   selectedProviderFilters,
  //   selectedCategoryFilters,
  //   selectedFeatureFilters,
  //   selectedThemeFilters
  // })

  // useEffect(() => {
  //   setGameCardsData(combinedFilter)
  // }, [combinedFilter])

  // const searchTerm = "God"


  // const [loading, setLoading] = useState(true)




  // useEffect(() => {
  //   async function fetchMovies() {
  //     try {
  //       const response = 
  //         await fetch("/api/movies")
  //         // await fetch("/api/movies?section=discover&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc")
  //       const { results } = await response.json() as Root
  //       // const { logos } = await response.json() as Root
  //       setMovies(results)
  //       // setMovies(logos)
  //     } catch (error) {
  //       console.error("Error fetching movies:", error)
  //     } finally {
  //       setLoading(false)
  //     }
  //   }

  //   fetchMovies()
  // }, [query])






  return (
    <div className={`grid m-3 gap-6 p-2 overflow-y-scroll h-[70vh]
        ${isDisplayingGridView ? "mobileL:grid-cols-5 mobileXL:grid-cols-2 grid-cols-2" : "grid-cols-1"}`}
    >
      {movies?.map(({ id, poster_path: posterPath, original_title: originalTitle }) => (
        <MovieCard
          key={id}
          {...{
            id,
            name: originalTitle,
            // iconSmall: posterPath === "N/A" ? fallbackPlaceholder : posterPath,  
            iconSmall: posterPath,
            setSelectedMovieId,
            selectedMovieId
            // isDisplayingGridView
          }}
        />
      ))}
    </div>
  )
}

export default MovieCardList