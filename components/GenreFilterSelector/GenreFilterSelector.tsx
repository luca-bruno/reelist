import { FC, Dispatch, SetStateAction, useEffect, useState } from "react"
import { HEADERS_ALLOW_ORIGIN } from "@/constants"
import { filterTypes } from "@/types/filter.interface"
import Select, { MultiValue } from "react-select"
import makeAnimated from "react-select/animated"
import { optionTypes } from "../MovieSelectionPane/types/MovieSelectionPaneDropdown.interface"

const GenreFilterSelector: FC<{ setFilter: Dispatch<SetStateAction<filterTypes | undefined>> }> = ({ setFilter }) => {
  const [genres, setGenres] = useState()

  const animatedComponents = makeAnimated()
  const whiteColourStyle = { color: "white" }

  useEffect(() => {
    const loadGenres = async () => {
      const genresResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/genres`, HEADERS_ALLOW_ORIGIN)
      const { genres: genreResponseData } = await genresResponse.json()

      const formatted = genreResponseData.map((genre: { name: string; id: number }) => ({ label: genre.name, value: genre.id }))

      setGenres(formatted)
      // localStorage.setItem("client-country", JSON.stringify({ name: clientCountryData.country_name, code: clientCountryData.country_code }))
    }

    loadGenres()
  }, [])

  const handleGenreChange = (
    selectedOption: MultiValue<
      optionTypes<{
        name: string
        id: number
      }>
    >,
    action: string
  ) => {
    const delay = 1000

    const debounceTimer = setTimeout(() => {
      if (action === "select-option") {
        // Extract values from selected options for multi-select
        const extractValues = selectedOption.map(option => option.value)
        setFilter(prev => ({ ...prev, genres: extractValues }))
      } else if (action === "clear") {
        setFilter(prev => {
          const { genres, ...rest } = prev || {} // Destructure to exclude origin_country
          return { ...rest } // Return the rest of the filter without the origin_country key
        })
      } else if (action === "remove-value") {
        setFilter(prev => {
          const currentGenres = selectedOption.map(option => option.value)
          const valueToRemove = prev?.genres?.find(genre => !currentGenres.includes(genre))

          const filteredGenres = [...prev?.genres || []].filter(genre => genre !== valueToRemove)

          return { ...prev, genres: filteredGenres }
        })
      }
    }, delay)

    return () => clearTimeout(debounceTimer)
  }

  return (
    <div>
      <Select
        isMulti
        isSearchable
        components={animatedComponents}
        onChange={(selectedOption, { action }) =>
          handleGenreChange(
            selectedOption as unknown as MultiValue<
              optionTypes<{
                name: string
                id: number
              }>
            >,
            action
          )
        }
        options={genres}
        // isLoading={isLoading}
        placeholder="🔎 Genre(s)"
        classNamePrefix="movie-selection-pane-dropdown"
        styles={{
          control: (base, state) => ({
            ...base,
            backgroundColor: state.isFocused ? "#eaeaea" : "white",
            borderRadius: "0.75rem",
            border: "none",
            boxShadow: state.isFocused ? "0 0 0 2px #E64833" : "none",
            "&:hover": {
              backgroundColor: "#eaeaea"
            }
          }),
          menu: base => ({
            ...base,
            // zIndex: "20",
            backgroundColor: "#eaeaea",
            borderRadius: "0.75rem",
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
          }),
          menuList: base => ({
            ...base,
            borderRadius: "0.75rem",
            paddingBottom: "10px"
          }),
          option: base => ({
            ...base,
            cursor: "pointer",
            borderRadius: "0.5rem",
            backgroundColor: "#eaeaea",
            // ...whiteColourStyle,
            "&:hover": {
              backgroundColor: "#ec7b69",
              color: "white"
            }
          }),
          placeholder: base => ({
            ...base
            // ...whiteColourStyle
            // color: "rgb(156 163 175 / 0.5)"
          }),
          input: base => ({
            ...base
            // ...whiteColourStyle
            // color: "rgb(156 163 175 / 0.5)"
          }),
          noOptionsMessage: base => ({
            ...base
            // ...whiteColourStyle
          }),
          dropdownIndicator: (base, state) => ({
            ...base,
            color: "#808088",
            // ...whiteColourStyle,
            "&:hover": {
              color: "#808088"
              // ...whiteColourStyle
            },
            transition: "transform 0.3s ease",
            transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : "rotate(0deg)"
          }),
          singleValue: base => ({
            ...base,
            // ...whiteColourStyle,
            text: "black",
            "&:hover": {
              // ...whiteColourStyle
            }
          }),
          loadingIndicator: base => ({
            ...base,
            ...whiteColourStyle
          })
        }}
      />
    </div>
  )
}

export default GenreFilterSelector
