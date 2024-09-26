import { movieTypes } from "@/types/movie.interface"
import capitalise from "../capitalise/capitalise"
import addToPlaylist from "../addToPlaylist/addToPlaylist"

const createNewPlaylist = (playlistName: string, selectedMovie: movieTypes) => {
  const formattedPlaylistName = capitalise(playlistName)

  const storedCustomPlaylists: string[] =
    JSON.parse(localStorage.getItem("custom-playlists") as string) || []

  // Return early if playlist already exists
  if (storedCustomPlaylists.includes(formattedPlaylistName)) {
    return null
  }

  // Add the new playlist and update localStorage
  storedCustomPlaylists.push(formattedPlaylistName)
  localStorage.setItem(
    "custom-playlists",
    JSON.stringify(storedCustomPlaylists)
  )

  addToPlaylist(playlistName, selectedMovie)
}

export default createNewPlaylist
