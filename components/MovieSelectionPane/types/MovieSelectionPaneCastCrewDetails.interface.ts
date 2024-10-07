import { movieTypes } from "@/types/movie.interface"

interface MovieSelectionPaneCastCrewDetailsTypes {
  cast?: movieTypes["credits"]["cast"]
  crew?: movieTypes["credits"]["crew"]
}

export default MovieSelectionPaneCastCrewDetailsTypes
