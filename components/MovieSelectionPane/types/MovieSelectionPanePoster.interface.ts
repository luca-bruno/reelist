import { movieTypes } from "@/types/movie.interface"

interface MovieSelectionPanePosterTypes {
  title?: movieTypes["title"]
  hasImageLoaded: boolean
  setHasImageLoaded: (arg0: boolean) => void
  hasReturnedError: boolean
  setHasReturnedError: (arg0: boolean) => void
  poster?: movieTypes["poster_path"]
  watchProviders?: movieTypes["watch/providers"]
}

export default MovieSelectionPanePosterTypes
