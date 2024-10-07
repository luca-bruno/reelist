import { FC, Dispatch, SetStateAction } from "react"
import { filterTypes } from "@/types/filter.interface"
import Select, { SingleValue } from "react-select"
import makeAnimated from "react-select/animated"
import { optionTypes } from "../MovieSelectionPane/types/MovieSelectionPaneDropdown.interface"

// Utility function to generate an array of years
const generateYears = (startYear: number, endYear: number) => {
  const years = []
  for (let year = startYear; year <= endYear; year += 1) {
    years.push({ value: year, label: year })
  }

  years.sort((a, b) => b.value - a.value)
  return years
}

const YearFilterSelector: FC<{ setFilter: Dispatch<SetStateAction<filterTypes | undefined>> }> = ({ setFilter }) => {
  // Generate years between 1888 and the current year
  const currentYear = new Date().getFullYear()
  const years = generateYears(1888, currentYear)

  const animatedComponents = makeAnimated()
  const whiteColourStyle = { color: "white" }

  // Handle change event when a year is selected
  // TODO: make debounce fn generic across all filter inc search
  const handleYearChange = (selectedOption: SingleValue<optionTypes<string>>, action: string) => {
    const delay = 1000

    const debounceTimer = setTimeout(() => {
      if (action === "select-option") {
        setFilter(prev => ({ ...prev, year: selectedOption?.value }))
      } else if (action === "clear") {
        setFilter(prev => {
          const { year, ...rest } = prev || {}
          return { ...rest } // Return the rest of the filter without the year key
        })
      }
    }, delay)

    return () => clearTimeout(debounceTimer)
  }

  return (
    <div>
      <Select
        isSearchable
        isClearable
        components={animatedComponents}
        onChange={(selectedOption, { action }) => handleYearChange(selectedOption as SingleValue<optionTypes<string>>, action)}
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
