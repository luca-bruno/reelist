import MovieCardListTypes from "@/components/MovieCardList/types/MovieCardList.interface"
import { movieTypes } from "@/types/movies.interface"

interface MovieCardTypes {
    id: movieTypes["id"]
    title: movieTypes["title"]
    iconSmall: movieTypes["poster_path"]
    setSelectedMovieId: MovieCardListTypes["setSelectedMovieId"]
    selectedMovieId: MovieCardListTypes["selectedMovieId"]
    isDisplayingGridView: MovieCardListTypes["isDisplayingGridView"]
}

export default MovieCardTypes