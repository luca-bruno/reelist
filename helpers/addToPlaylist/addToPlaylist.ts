import { movieTypes } from "@/types/movie.interface"
import capitalise from "../capitalise/capitalise"

const addToPlaylist = (
  listKey: string,
  selectedMovie: movieTypes,
  toggledAddition: boolean = false
) => {
  const playlistKey = capitalise(listKey)

  const existingPlaylist: movieTypes[] =
    JSON.parse(localStorage.getItem(playlistKey) as string) || []

  // Only add the movie if it doesn't already exist
  if (!existingPlaylist.some(item => item.id === selectedMovie.id)) {
    existingPlaylist.push(selectedMovie)
  } else if (toggledAddition) {
    console.log("hello")
    const itemIndex = existingPlaylist.findIndex(item => item?.id === selectedMovie.id)
    existingPlaylist.splice(itemIndex, 1)
  }
  localStorage.setItem(playlistKey, JSON.stringify(existingPlaylist))
}

export default addToPlaylist
