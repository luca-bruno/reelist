import React from "react"
import Select from "react-select"
import makeAnimated from "react-select/animated"

// Utility function to generate an array of years
const generateYears = (startYear, endYear) => {
  const years = []
  for (let year = startYear; year <= endYear; year++) {
    years.push({ value: year, label: year })
  }

  years.sort((a, b) => b.value - a.value)
  return years
}

const YearFilterSelector = ({ setFilter }) => {
  // Generate years between 1888 and the current year
  const currentYear = new Date().getFullYear()
  const years = generateYears(1888, currentYear)

  const animatedComponents = makeAnimated()
  const whiteColourStyle = { color: "white" }

  // Handle change event when a year is selected
  const handleYearChange = (selectedOption, action) => {
    console.log(action)
    if (action === "select-option") {
      setFilter(prev => ({ ...prev, year: selectedOption.value }))
    } else if (action === "clear") {
      setFilter(prev => ({ ...prev, year: null }))
    }
  }

  return (
    <div>
      <Select
        isSearchable
        isClearable
        components={animatedComponents}
        onChange={(selectedOption, {action}) => handleYearChange(selectedOption, action)}
        options={years}
        // isLoading={isLoading}
        placeholder="🔎 Year"
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
          option: (base, state) => ({
            ...base,
            cursor: "pointer",
            borderRadius: "0.5rem",
            backgroundColor: state.isSelected ? "#E64833" : "#eaeaea",
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

export default YearFilterSelector
