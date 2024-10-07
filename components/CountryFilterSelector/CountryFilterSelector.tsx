import { FC, Dispatch, SetStateAction, useEffect, useState } from "react"
import useCountries from "@/hooks/useCountries/useCountries"
import Select, { MultiValue } from "react-select"
import { getCountryEmoji } from "@/helpers"
import { countriesTypes } from "@/types/movie.interface"
import makeAnimated from "react-select/animated"
import { filterTypes } from "@/types/filter.interface"
import { optionTypes } from "../MovieSelectionPane/types/MovieSelectionPaneDropdown.interface"

const CountryFilterSelector: FC<{ setFilter: Dispatch<SetStateAction<filterTypes | undefined>> }> = ({ setFilter }) => {
  const [values, setValues] = useState()

  const animatedComponents = makeAnimated()
  const whiteColourStyle = { color: "white" }

  const { data: countriesResponseData } = useCountries(false)

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
      .sort((a: { nativeName: string }, b: { nativeName: string }) => a.nativeName?.localeCompare(b.nativeName))

    setValues(formattedCountries)
  }, [countriesResponseData])

  const handleCountryChange = (
    selectedOption: MultiValue<
      optionTypes<{
        nativeName: string
        englishName: string
        isoCode: string
      }>
    >,
    action: string
  ) => {
    const delay = 1000

    const debounceTimer = setTimeout(() => {
      if (action === "select-option") {
        // Extract values from selected options for multi-select
        const extractValues = selectedOption.map(option => option.value)
        setFilter(prev => ({ ...prev, origin_country: extractValues }))
      } else if (action === "clear") {
        setFilter(prev => {
          const newFilter = { ...prev }
          delete newFilter.origin_country
          return newFilter // Return the modified filter without the origin_country key
        })
      } else if (action === "remove-value") {
        setFilter(prev => {
          const currentCountry = selectedOption.map(option => option.value)
          const valueToRemove = prev?.origin_country?.find(country => !currentCountry.includes(country))

          const filteredCountries = [...(prev?.origin_country || [])].filter(country => country !== valueToRemove)

          return { ...prev, origin_country: filteredCountries }
        })
      }
    }, delay)

    return () => clearTimeout(debounceTimer)
  }

  const filterOption = (option: { label: string; data: { nativeName: string; englishName: string; isoCode: string } }, inputValue: string) => {
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
        onChange={(selectedOption, { action }) =>
          handleCountryChange(
            selectedOption as unknown as MultiValue<
              optionTypes<{
                nativeName: string
                englishName: string
                isoCode: string
              }>
            >,
            action
          )
        }
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
            "&:hover": {
              backgroundColor: "#ec7b69",
              color: "white"
            }
          }),
          dropdownIndicator: (base, state) => ({
            ...base,
            color: "#808088",
            "&:hover": {
              color: "#808088"
            },
            transition: "transform 0.3s ease",
            transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : "rotate(0deg)"
          }),
          singleValue: base => ({
            ...base,
            text: "black"
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
