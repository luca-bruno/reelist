"use client"

import { useEffect, useState } from "react"
import makeAnimated from "react-select/animated"
import Select, { SingleValue } from "react-select"
import { Atkinson_Hyperlegible } from "next/font/google"
import fetchCountries from "@/services/fetchCountries/fetchCountries"
import { getCountryEmoji } from "@/helpers"
import fetchClientCountry from "@/services/fetchClientCountry/fetchClientCountry"
import { optionTypes } from "../MovieSelectionPane/types/MovieSelectionPaneDropdown.interface"

const atkinsonHyperlegible = Atkinson_Hyperlegible({
  subsets: ["latin"],
  weight: "400"
})

const CountrySelector = () => {
  // const [countries, setCountries] = useState([
  //     { label: "🇲🇹 Malta", value: "Malta" },
  //     { label: "🇫🇮 Finland", value: "Finland" }
  //   ])
  const [value, setValue] = useState<{ label: string; value: string }>()

  const [countries, setCountries] = useState<{ label: string; value: string }[]>()
  const [clientCountry, setClientCountry] = useState<string>()

  useEffect(() => {
    const loadClientCountry = async () => {
      const clientCountryData = (await fetchClientCountry()) as { ip: string; country: string }
      setClientCountry(clientCountryData?.country as string)
    }

    loadClientCountry()
  }, [])

  useEffect(() => {
    const loadCountries = async () => {
      const countryData = (await fetchCountries()) as { name: { common: string }; cca2: string }[]

      // Mapping the country data to the required format
      const formattedCountries = countryData
        ?.map(country => ({
          label: `${getCountryEmoji(country.cca2)} ${country.name.common}`,
          value: country.name.common
        }))
        .sort((a, b) => a.value.localeCompare(b.value))

      setCountries(formattedCountries)
    }

    loadCountries()
  }, [])

  const handleDropdownClick = (newValue: SingleValue<optionTypes>) => {
    if (newValue) {
      setValue(newValue)
    }
  }

  //   useEffect(() => {
  //     if (watchProviders) {
  //       const countries = Object.keys(watchProviders.results).map(y => ({
  //         label: `${getCountryEmoji(y)} ${getCountryNameFromEmoji(getCountryEmoji(y) as string)}`,
  //         value: y
  //       }))

  //       setCountries(countries)
  //     }
  //   }, [watchProviders])

  useEffect(() => {
    if (countries && countries?.length > 0) {
      const prioritizedCountry =
        countries?.find(country => country.value === clientCountry) ||
        countries?.find(country => country.value === "GB") ||
        countries?.find(country => country.value === "US") ||
        countries?.[0]

      setValue(prioritizedCountry)
    }
  }, [clientCountry, countries])

  const animatedComponents = makeAnimated()
  const whiteColourStyle = { color: "white" }
  return (
    // <Select
    //   isSearchable={false}
    //   className={`px-3 mt-2 ${atkinsonHyperlegible.className}`}
    //   components={animatedComponents}
    //   onChange={newValue => handleDropdownClick(newValue as SingleValue<optionTypes>)}
    //   options={countries}
    //   value={value}
    //   classNamePrefix="movie-selection-pane-dropdown"
    //   styles={{
    //     control: (base, state) => ({
    //       ...base,
    //       backgroundColor: state.isFocused ? "white" : "",
    //       borderRadius: "0.75rem",
    //       border: "none",
    //       opacity: state.isFocused ? 1 : 0.8,
    //       boxShadow: state.isFocused ? "0 0 0 2px rgba(251, 146, 60, 0.5)" : "none",
    //       "&:hover": {
    //         opacity: 1,
    //         backgroundColor: "#E64833",
    //         color: "white"
    //       }
    //     }),
    //     menu: base => ({
    //       ...base,
    //       marginTop: "-2px",
    //       zIndex: "20",
    //       backgroundColor: "#E64833",
    //       borderRadius: "0.75rem",
    //       boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
    //     }),
    //     menuList: base => ({
    //       ...base,
    //       maxHeight: "130px",
    //       paddingBottom: "10px"
    //     }),
    //     option: base => ({
    //       ...base,
    //       cursor: "pointer",
    //       borderRadius: "0.5rem",
    //       backgroundColor: "#E64833",
    //       ...whiteColourStyle,
    //       "&:hover": {
    //         backgroundColor: "#ec7b69"
    //       }
    //     }),
    //     placeholder: base => ({
    //       ...base,
    //       ...whiteColourStyle
    //     }),
    //     input: base => ({
    //       ...base,
    //       ...whiteColourStyle
    //     }),
    //     noOptionsMessage: base => ({
    //       ...base,
    //       ...whiteColourStyle
    //     }),
    //     dropdownIndicator: (base, state) => ({
    //       ...base,
    //        color: "#E64833",
    //       transition: "transform 0.3s ease",
    //       transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : "rotate(0deg)"
    //     }),
    //     singleValue: base => ({
    //         ...base,
    //         color: "#E64833"
    //     })
    //   }}
    // />

    <Select
      isSearchable={false}
      className={`px-3 mt-2 ${atkinsonHyperlegible.className}`}
      components={animatedComponents}
      onChange={newValue => handleDropdownClick(newValue as SingleValue<optionTypes>)}
      options={countries}
      value={value}
      classNamePrefix="movie-selection-pane-dropdown"
      styles={{
        control: (base, state) => ({
          ...base,
          backgroundColor: state.isFocused ? "#E64833" : "rgba(0, 0, 0, 0.2)",
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
          zIndex: "20",
          position: "absolute",
          right: "0",
          marginRight: "12px",
          backgroundColor: "#E64833",
          borderRadius: "0.75rem",
          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
        }),
        menuList: base => ({
          ...base,
          maxHeight: "130px"
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
        }),
        singleValue: base => ({
          ...base,
          ...whiteColourStyle,
          "&:hover": {
            ...whiteColourStyle
          }
        })
      }}
    />
  )
}

export default CountrySelector
