import { TagGroups } from "@/components/Tags/types/Tags.interface"
import { movieTypes } from "@/types/movie.interface"

interface MovieSelectionPaneDetailsTypes {
  originCountry?: movieTypes["origin_country"]
  originalTitle?: movieTypes["original_title"]
  runtime?: movieTypes["runtime"]
  releaseDate?: movieTypes["release_date"]
  ageRating?: movieTypes["release_dates"]
  genres?: movieTypes["genres"]
  overview?: movieTypes["overview"]
  tagline?: movieTypes["tagline"]
  title: movieTypes["title"]
  tags?: TagGroups
}

export default MovieSelectionPaneDetailsTypes
