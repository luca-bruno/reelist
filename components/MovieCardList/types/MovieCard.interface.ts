import MovieCardListTypes from "@/components/MovieCardList/types/MovieCardList.interface"
import { movieTypes } from "@/types/movie.interface"

interface MovieCardTypes {
  id: movieTypes["id"]
  title: movieTypes["title"]
  posterPath: movieTypes["poster_path"]
  selectedMovieId: MovieCardListTypes["selectedMovieId"]
}

export default MovieCardTypes
