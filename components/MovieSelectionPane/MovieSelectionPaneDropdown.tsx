import { FC, useEffect, useState } from "react"
import { capitalise, transitionStyles } from "@/helpers"
import CreatableSelect from "react-select/creatable"
import makeAnimated from "react-select/animated"
import { SingleValue } from "react-select"
import { usePlaylist } from "@/context/PlaylistContext"
import { faX } from "@fortawesome/free-solid-svg-icons/faX"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { MovieSelectionPaneDropdownTypes, optionTypes } from "./types/MovieSelectionPaneDropdown.interface"

const MovieSelectionPaneDropdown: FC<MovieSelectionPaneDropdownTypes> = ({ selectedMovie }) => {
  const [customPlaylists, setCustomPlaylists] = useState<string[]>()
  const [options, setOptions] = useState<optionTypes<string>[]>([])

  const { playlists, addToPlaylist, createCustomPlaylist, customPlaylistNames } = usePlaylist()

  const miscKeywords = ["Get Started", "Jump Back In", "Your Latest Search"]
  const favouriteSimilarKeywords = ["Favorite", "Favourite", "Favorites", "Favourites"]
  const watchlistSimilarKeywords = ["Watch list", "Watchlist", "Watchlists", "Watch lists"]
  const reservedKeywords = [...miscKeywords, ...favouriteSimilarKeywords, ...watchlistSimilarKeywords]

  const animatedComponents = makeAnimated()

  const whiteColourStyle = { color: "white" }

  const isReserved = (value: string) => value === "" || reservedKeywords.some(keyword => capitalise(value.trim()) === keyword)
  const isDuplicate = (value: string) => customPlaylists?.some(playlist => capitalise(value.trim()) === playlist)

  useEffect(() => {
    setCustomPlaylists(customPlaylistNames)

    const optionsArray = customPlaylistNames.map((playlist: string) => {
      const capitalisedPlaylist = capitalise(playlist)

      const alreadyInPlaylist = playlists[capitalisedPlaylist]?.some(movie => movie.id === selectedMovie.id)

      return {
        label: capitalisedPlaylist,
        value: capitalisedPlaylist,
        alreadyInPlaylist
      }
    })

    setOptions(optionsArray)
  }, [customPlaylistNames, playlists, selectedMovie.id])

  const handleCreatePlaylist = (newPlaylistName: string) => {
    createCustomPlaylist(newPlaylistName)
  }

  const handleNamePlaylist = (text: string) => {
    const capitalisedInput = capitalise(text)

    const newPlaylist = { label: capitalisedInput, value: capitalisedInput }
    setOptions(prevOptions => [...prevOptions, newPlaylist])

    handleCreatePlaylist(text)
    addToPlaylist(text, selectedMovie)
  }

  const handleDropdownClick = (newValue: SingleValue<optionTypes<string>>) => {
    if (!newValue) return
    const playlistKey = newValue.value

    // If the movie already exists in the playlist, remove it (undo the addition)
    if (playlists[playlistKey]?.some(mov => mov.id === selectedMovie.id)) {
      addToPlaylist(playlistKey, selectedMovie, true)
    } else {
      addToPlaylist(playlistKey, selectedMovie)
    }
  }

  return (
    selectedMovie && (
      <span className="relative flex flex-col w-52">
        <div className="relative">
          <div className="flex flex-col w-full">
            <CreatableSelect
              isValidNewOption={value => !isDuplicate(value) && !isReserved(value)}
              noOptionsMessage={() => "Sorry, that name is a reserved keyword. Please select a different name to continue."}
              components={animatedComponents}
              onChange={newValue => handleDropdownClick(newValue as SingleValue<optionTypes<string>>)}
              onCreateOption={handleNamePlaylist}
              createOptionPosition="first"
              options={[
                {
                  label: "Favourites",
                  value: "Favourites",
                  alreadyInPlaylist: playlists.Favourites?.some(movie => movie.id === selectedMovie.id)
                },
                { label: "Watchlist", value: "Watchlist", alreadyInPlaylist: playlists.Watchlist?.some(movie => movie.id === selectedMovie.id) },
                ...options
              ]}
              value={null}
              placeholder="🔎 Add to Playlist"
              classNamePrefix="movie-selection-pane-dropdown"
              styles={{
                control: (base, state) => ({
                  ...base,
                  backgroundColor: state.isFocused ? "#E64833" : "gray",
                  borderRadius: "0.75rem",
                  border: "none",
                  opacity: state.isFocused ? 1 : 0.8,
                  boxShadow: state.isFocused ? "0 0 0 2px rgba(251, 146, 60, 0.5)" : "none",
                  "&:hover": {
                    opacity: 1,
                    backgroundColor: "#E64833"
                  }
                }),
                menu: base => ({
                  ...base,
                  backgroundColor: "#E64833",
                  borderRadius: "0.75rem",
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
                }),
                menuList: base => ({
                  ...base,
                  maxHeight: "130px",
                  paddingBottom: "10px"
                }),
                option: (base, state) => ({
                  ...base,
                  cursor: "pointer",
                  margin: "3px 0",
                  borderRadius: "0.5rem",
                  backgroundColor: (state.data as { alreadyInPlaylist: string }).alreadyInPlaylist ? "#b0b0b0" : "#E64833",
                  ...whiteColourStyle,
                  "&:hover": {
                    backgroundColor: (state.data as { alreadyInPlaylist: string }).alreadyInPlaylist ? "#bdbdbd" : "#ec7b69"
                  },
                  "::after":
                    state.isFocused && (state.data as { alreadyInPlaylist: string }).alreadyInPlaylist
                      ? {
                          content: '"\\00d7"', // Unicode for "X"
                          color: "white",
                          marginLeft: "10px",
                          fontWeight: "bold"
                        }
                      : {}
                }),
                placeholder: base => ({
                  ...base,
                  ...whiteColourStyle
                }),
                input: base => ({
                  ...base,
                  ...whiteColourStyle
                }),
                noOptionsMessage: base => ({
                  ...base,
                  ...whiteColourStyle
                }),
                dropdownIndicator: (base, state) => ({
                  ...base,
                  ...whiteColourStyle,
                  "&:hover": {
                    ...whiteColourStyle
                  },
                  transition: "transform 0.3s ease",
                  transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : "rotate(0deg)"
                })
              }}
            />
          </div>
        </div>
      </span>
    )
  )
}

export default MovieSelectionPaneDropdown
