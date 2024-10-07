import { TagGroups } from "@/components/Tags/types/Tags.interface"
import { movieTypes } from "@/types/movie.interface"

interface MovieSelectionPaneDetailsTypes {
  overview?: movieTypes["overview"]
  tags?: TagGroups
}

export default MovieSelectionPaneDetailsTypes
