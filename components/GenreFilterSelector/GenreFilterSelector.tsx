import { HEADERS_ALLOW_ORIGIN } from "@/constants"
import React, { useEffect, useState } from "react"
import Select from "react-select"
import makeAnimated from "react-select/animated"

const GenreFilterSelector = ({ setFilter }) => {
  const [genres, setGenres] = useState()

  const animatedComponents = makeAnimated()
  const whiteColourStyle = { color: "white" }

  useEffect(() => {
    const loadGenres = async () => {
      const genresResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/genres`, HEADERS_ALLOW_ORIGIN)
      const { genres: genreResponseData } = await genresResponse.json()

      const formatted = genreResponseData.map(x => ({ label: x.name, value: x.id }))

      console.log(formatted)
      setGenres(formatted)
      // localStorage.setItem("client-country", JSON.stringify({ name: clientCountryData.country_name, code: clientCountryData.country_code }))
    }

    loadGenres()
  }, [])

  const handleGenreChange = selectedOption => {
    const delay = 1000

    const debounceTimer = setTimeout(() => {
      const extractValues = selectedOption.map(option => option.value)
      setFilter(prev => ({ ...prev, genres: extractValues }))
    }, delay)

    return () => clearTimeout(debounceTimer)
  }

  return (
    <div>
      <Select
        isMulti
        isSearchable
        components={animatedComponents}
        onChange={selectedOption => handleGenreChange(selectedOption)}
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
