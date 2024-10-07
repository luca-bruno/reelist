import { useEffect, useState } from "react"
import useCountries from "@/hooks/useCountries/useCountries"
import Select from "react-select"
import { getCountryEmoji } from "@/helpers"
import { countriesTypes } from "@/types/movie.interface"
import makeAnimated from "react-select/animated"

const CountryFilterSelector = ({ setFilter }) => {
  const [values, setValues] = useState()

  const animatedComponents = makeAnimated()
  const whiteColourStyle = { color: "white" }

  const { data: countriesResponseData } = useCountries()

  useEffect(() => {
    const formattedCountries = countriesResponseData
      ?.map((country: countriesTypes) => ({
        label: (
          <span className="flex">
            {getCountryEmoji({ countryCode: country.iso_3166_1 }) || ""}
            {` ${country.native_name}`}
          </span>
        ),
        value: country.iso_3166_1,
        nativeName: country.native_name, // Adding original name for search
        englishName: country.english_name, // Adding English name for search
        isoCode: country.iso_3166_1 // Adding ISO code for search
      }))
      .sort((a, b) => a.nativeName?.localeCompare(b.nativeName))

    setValues(formattedCountries)
  }, [countriesResponseData])

  const handleCountryChange = selectedOption => {
    const delay = 1000

    const debounceTimer = setTimeout(() => {
      const extractValues = selectedOption.map(option => option.value)
      setFilter(prev => ({ ...prev, origin_country: extractValues }))
    }, delay)

    return () => clearTimeout(debounceTimer)
  }

  const filterOption = (option, inputValue) => {
    // NOTE: Searchable by country code, native name or English-translated name
    const { label, data } = option
    const searchTerm = inputValue.toLowerCase()

    // Use optional chaining and fallback to empty string to prevent errors
    return (
      label.toString().toLowerCase().includes(searchTerm) ||
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
        onChange={selectedOption => handleCountryChange(selectedOption)}
        options={values}
        // isLoading={isLoading}
        placeholder="🔎 Country(ies)"
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

export default CountryFilterSelector
