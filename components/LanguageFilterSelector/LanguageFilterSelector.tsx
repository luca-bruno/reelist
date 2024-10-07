import { HEADERS_ALLOW_ORIGIN } from "@/constants"
import { capitalise } from "@/helpers"
import React, { useEffect, useState } from "react"
import Select from "react-select"
import makeAnimated from "react-select/animated"

const LanguageFilterSelector = ({ setFilter }) => {
  const [values, setValues] = useState()

  const animatedComponents = makeAnimated()
  const whiteColourStyle = { color: "white" }

  useEffect(() => {
    const loadGenres = async () => {
      const languagesResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/languages`, HEADERS_ALLOW_ORIGIN)
      const languagesResponseData = await languagesResponse.json()

      // NOTE: to avoid rendering incomplete/WIP labels (eg. ??????)
      const formatted = languagesResponseData
        .map(x => ({
          label: x.name && !x.name.includes("?") ? capitalise(x.name) : capitalise(x.english_name),
          value: x.iso_639_1,
          nativeName: capitalise(x.name), // Adding original name for search
          englishName: capitalise(x.english_name), // Adding English name for search
          isoCode: x.iso_639_1 // Adding ISO code for search
        }))
        .sort((a, b) => a.englishName?.localeCompare(b.englishName))

      setValues(formatted)
    }

    loadGenres()
  }, [])

  // Handle change event when a year is selected
  const handleLanguageChange = selectedOption => {
    const delay = 1000

    const debounceTimer = setTimeout(() => {
      const extractValues = selectedOption.map(option => option.value)
      setFilter(prev => ({ ...prev, original_language: extractValues }))

      return () => clearTimeout(debounceTimer)
    }, delay)
  }

  const filterOption = (option, inputValue) => {
    // NOTE: Searchable by language code, native name or English-translated name
    const { label, data } = option
    const searchTerm = inputValue.toLowerCase()

    // Use optional chaining and fallback to empty string to prevent errors
    return (
      label.toLowerCase().includes(searchTerm) ||
      (data.nativeName?.toLowerCase() || "").includes(searchTerm) ||
      (data.englishName?.toLowerCase() || "").includes(searchTerm) ||
      (data.isoCode?.toLowerCase() || "").includes(searchTerm)
    )
  }

  return (
    <div>
      <Select
        isMulti
        isSearchable
        components={animatedComponents}
        onChange={selectedOption => handleLanguageChange(selectedOption)}
        options={values}
        // isLoading={isLoading}
        placeholder="🔎 Language(s)"
        filterOption={filterOption}
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

export default LanguageFilterSelector
