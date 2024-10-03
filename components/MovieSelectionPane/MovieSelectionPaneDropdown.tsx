import { FC, useEffect, useState } from "react"
import { addToPlaylist, capitalise } from "@/helpers"
import createNewPlaylist from "@/helpers/createNewPlaylist/createNewPlaylist"
import CreatableSelect from "react-select/creatable"
import makeAnimated from "react-select/animated"
import { SingleValue } from "react-select"
import { MovieSelectionPaneDropdownTypes, optionTypes } from "./types/MovieSelectionPaneDropdown.interface"

const MovieSelectionPaneDropdown: FC<MovieSelectionPaneDropdownTypes> = ({ selectedMovie }) => {
  const [playlists, setPlaylists] = useState<string[]>()
  const [options, setOptions] = useState<optionTypes<string>[]>([])

  const miscKeywords = ["Get Started", "Jump Back In", "Your Latest Search"]
  const favouriteSimilarKeywords = ["Favorite", "Favourite", "Favorites", "Favourites"]
  const watchlistSimilarKeywords = ["Watch list", "Watchlist", "Watchlists", "Watch lists"]
  const reservedKeywords = [...miscKeywords, ...favouriteSimilarKeywords, ...watchlistSimilarKeywords]

  const animatedComponents = makeAnimated()

  const whiteColourStyle = { color: "white" }

  const isReserved = (value: string) => value === "" || reservedKeywords.some(keyword => capitalise(value.trim()) === keyword)
  const isDuplicate = (value: string) => playlists?.some(playlist => capitalise(value.trim()) === playlist)

  useEffect(() => {
    const savedPlaylists = JSON.parse(localStorage.getItem("custom-playlists") as string) || []
    setPlaylists(savedPlaylists)

    const optionsArray = savedPlaylists.map((playlist: string) => ({ label: playlist, value: playlist }))
    setOptions(optionsArray)
  }, [setPlaylists])

  const handleNamePlaylist = (text: string) => {
    const capitalisedInput = capitalise(text)

    const newPlaylist = { label: capitalisedInput, value: capitalisedInput }
    setOptions(prevOptions => [...prevOptions, newPlaylist])

    createNewPlaylist(text, selectedMovie)
  }

  const handleDropdownClick = (newValue: SingleValue<optionTypes<string>>) => {
    addToPlaylist(newValue ? newValue?.value : "", selectedMovie)
  }

  return (
    selectedMovie && (
      <span className="relative flex flex-col w-52">
        <div className="relative">
          <div className=" flex flex-col w-full">
            <CreatableSelect
              isValidNewOption={value => !isDuplicate(value) && !isReserved(value)}
              noOptionsMessage={() => "Sorry, that name is a reserved keyword. Please select a different name to continue."}
              components={animatedComponents}
              onChange={newValue => handleDropdownClick(newValue as SingleValue<optionTypes<string>>)}
              onCreateOption={handleNamePlaylist}
              createOptionPosition="first"
              options={[{ label: "Favourites", value: "Favourites" }, { label: "Watchlist", value: "Watchlist" }, ...options]}
              value={null}
              placeholder="Add to Playlist"
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
                option: base => ({
                  ...base,
                  cursor: "pointer",
                  borderRadius: "0.5rem",
                  backgroundColor: "#E64833",
                  ...whiteColourStyle,
                  "&:hover": {
                    backgroundColor: "#ec7b69"
                  }
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
