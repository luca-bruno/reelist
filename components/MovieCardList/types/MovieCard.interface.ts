import MovieCardListTypes from "@/components/MovieCardList/types/MovieCardList.interface"
import { movieTypes } from "@/json/data.interface"

interface MovieCardTypes {
    id: movieTypes["id"]
    name: movieTypes["original_title"]
    iconSmall: movieTypes["poster_path"]
    setSelectedMovieId: MovieCardListTypes["setSelectedMovieId"]
    selectedMovieId: MovieCardListTypes["selectedMovieId"]
    isDisplayingGridView: MovieCardListTypes["isDisplayingGridView"]
}

export default MovieCardTypes