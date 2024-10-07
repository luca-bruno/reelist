import { movieTypes } from "@/types/movie.interface"

interface MovieSelectionPaneDetailsHeaderTypes {
  originCountry?: movieTypes["origin_country"]
  originalTitle?: movieTypes["original_title"]
  runtime?: movieTypes["runtime"]
  releaseDate?: movieTypes["release_date"]
  ageRating?: movieTypes["release_dates"]
  genres?: movieTypes["genres"]
  title?: movieTypes["title"]
  isTruncatedCountries?: boolean
}

export default MovieSelectionPaneDetailsHeaderTypes
