import { movieTypes } from "@/types/movie.interface"

interface MovieSelectionPaneDetailsTypes {
  originCountry?: movieTypes["origin_country"]
  originalTitle?: movieTypes["original_title"]
  overview?: movieTypes["overview"]
  popularity?: movieTypes["popularity"]
  releaseDate?: movieTypes["release_date"]
  runtime?: movieTypes["runtime"]
  spokenLanguages?: movieTypes["spoken_languages"]
  tagline?: movieTypes["tagline"]
  title: movieTypes["title"]
}

export default MovieSelectionPaneDetailsTypes
