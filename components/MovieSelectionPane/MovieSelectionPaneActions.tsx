import { addToPlaylist, transitionStyles } from "@/helpers"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { FC, useEffect, useState } from "react"
import {
  faCheck
  // ,
  // faChevronDown,
  // faChevronUp
} from "@fortawesome/free-solid-svg-icons"
import { movieTypes } from "@/types/movie.interface"
import createNewPlaylist from "@/helpers/createNewPlaylist/createNewPlaylist"

const MovieSelectionPaneActions: FC<{ selectedMovie?: movieTypes }> = ({ selectedMovie }) => {
  const [playlistName, setPlaylistName] = useState<string>("")
  const [
    isDropdownOpen
    // , setIsDropdownOpen
  ] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [playlists, setPlaylists] = useState<string[]>()

  const miscKeywords = ["Get Started", "Jump Back In", "Your Latest Search"]
  const favouriteKeywords = ["Favorite", "Favourite", "Favorites", "Favourites"]
  const watchlistKeywords = ["Watchlist", "Watch list", "Watchlists", "Watch lists"]

  const reservedKeywords = [...miscKeywords, ...favouriteKeywords, ...watchlistKeywords]

  useEffect(() => {
    setPlaylists(JSON.parse(localStorage.getItem("custom-playlists") as string))
  }, [])

  const handleNamePlaylist = (text: string) => {
    const words = text.split(/\s+/) // Split by spaces
    let foundKeyword = false

    reservedKeywords.forEach(keyword => {
      if (words.some(word => word.toLowerCase() === keyword.toLowerCase())) {
        foundKeyword = true
        setErrorMessage(`${text} contains a reserved keyword: "${keyword}".`)
      }
    })

    playlists?.forEach(playlist => {
      if (words.some(word => word.toLowerCase() === playlist.toLowerCase())) {
        foundKeyword = true
        setErrorMessage(`${playlist} already exists.`)
      }
    })

    if (!foundKeyword) {
      setErrorMessage(null)
      setPlaylistName(text)
    }
  }

  return (
    selectedMovie && (
      <>
        {/* <button
          type="button"
          onClick={() => addToPlaylist("Favourites", selectedMovie)}
          className="bg-accent-500 absolute rounded-xl py-4 tablet:py-6 px-8 tablet:px-12
        bottom-4 tablet:bottom-24 right-4 tablet:right-8 mx-1.5 text-xl tablet:text-3xl font-medium shadow-lg shadow-black/50 animate-bounce-slow"
        >
          ADD TO FAVOURITES
        </button> */}

        {/* <button
          type="button"
          onClick={() => addToPlaylist("Watchlist", selectedMovie)}
          className="bg-accent-500 rounded-xl py-4 tablet:py-6 px-8 tablet:px-12
      bottom-4 tablet:bottom-24 right-4 tablet:right-8 mx-1.5 text-xl tablet:text-3xl font-medium shadow-lg shadow-black/50 animate-bounce-slow"
        >
          ADD TO WATCHLIST
        </button> */}

        <span className="relative flex flex-col w-52">
          {/*  <button
            type="button"
            onClick={() => setIsDropdownOpen(prev => !prev)}
            className="bg-accent-500 rounded-xl py-4 px-8"
          >
            Add to Playlist
            <FontAwesomeIcon
              icon={isDropdownOpen ? faChevronUp : faChevronDown}
              className={`pl-2 ${transitionStyles}`}
            />
          </button> */}

          {isDropdownOpen && (
            <div className="absolute mt-14 flex flex-col">
              <div className="flex">
                <input
                  type="text"
                  maxLength={28}
                  placeholder="Create new playlist..."
                  className="text-black focus:outline-none focus:ring-0 border-2 rounded-tl-xl
                    focus:border-accent-500 p-2 laptopXL:w-96 w-full text-sm tablet:text-lg"
                  onChange={e => handleNamePlaylist(e.target.value)}
                />

                {
                  <button
                    type="button"
                    aria-label="Confirm new playlist"
                    disabled={!playlistName && errorMessage !== null}
                    onClick={() => createNewPlaylist(playlistName, selectedMovie)}
                    className={`rounded-tr-xl ${
                      playlistName && errorMessage === null
                        ? "bg-accent-500 hover:bg-accent-300"
                        : "bg-gray-300"
                    }`}
                    //     className="bg-accent-500 rounded-xl py-4 tablet:py-6 px-8 tablet:px-12
                    // bottom-4 tablet:bottom-24 right-4 tablet:right-8 mx-1.5 text-xl tablet:text-3xl
                    // font-medium shadow-lg shadow-black/50 animate-bounce-slow"
                  >
                    <FontAwesomeIcon icon={faCheck} className={`px-2 ${transitionStyles}`} />
                  </button>
                }

                {errorMessage && <p className="text-green-500">{errorMessage}</p>}
              </div>

              {playlists?.map(playlist => (
                <button
                  type="button"
                  aria-label={`Add ${selectedMovie} to ${playlist}`}
                  key={playlist}
                  // disabled={!playlistName}
                  onClick={() => addToPlaylist(playlist, selectedMovie)}
                  className={`bg-accent-500 hover:bg-accent-300 ${transitionStyles} last-of-type:rounded-b-xl py-2`}
                  //     className="bg-accent-500 rounded-xl py-4 tablet:py-6 px-8 tablet:px-12
                  // bottom-4 tablet:bottom-24 right-4 tablet:right-8 mx-1.5 text-xl tablet:text-3xl
                  // font-medium shadow-lg shadow-black/50 animate-bounce-slow"
                >
                  {playlist}
                </button>
              ))}
            </div>
          )}
        </span>
      </>
    )
  )
}

export default MovieSelectionPaneActions
