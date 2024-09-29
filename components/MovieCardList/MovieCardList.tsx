import { FC } from "react"
// import useFilter from "@/hooks/useFilter/useFilter"
// import fallbackPlaceholder from "@/public/fallbackPlaceholder.jpg"
import MovieCardListTypes from "./types/MovieCardList.interface"
import MovieCard from "./MovieCard"

const MovieCardList: FC<MovieCardListTypes> = ({
  setSelectedMovieId,
  selectedMovieId,
  // query,
  // genres,
  movies,
  isDisplayingGridView = true
  // selectedProviderFilters,
  // selectedCategoryFilters,
  // selectedFeatureFilters,
  // selectedThemeFilters
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const x = ""
  // TODO: SWR or react-query + make into custom hook

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

  // const [loading, setLoading] = useState(true)

  return (
    <div
      className={`grid m-3 gap-6 p-2 overflow-y-scroll h-[70vh]
        ${
          isDisplayingGridView
            ? "mobileL:grid-cols-5 mobileXL:grid-cols-2 grid-cols-2"
            : "grid-cols-1"
        }
            `}
    >
      {movies?.map(({ id, poster_path: posterPath, title }) => (
        <MovieCard
          key={id}
          {...{
            id,
            title,
            posterPath,
            setSelectedMovieId,
            selectedMovieId,
            isDisplayingGridView: true
          }}
        />
      ))}
    </div>
  )
}

export default MovieCardList
