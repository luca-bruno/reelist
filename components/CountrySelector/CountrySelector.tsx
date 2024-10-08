"use client"

import { useEffect, useState } from "react"
import makeAnimated from "react-select/animated"
import Select, { SingleValue } from "react-select"
import { Atkinson_Hyperlegible } from "next/font/google"
import { getCountryEmoji } from "@/helpers"
import { IS_BROWSER } from "@/constants"
import { countriesTypes } from "@/types/movie.interface"
import useCountries from "@/hooks/useCountries/useCountries"
import useLocale from "@/hooks/useLocale/useLocale"
import { useClientCountry } from "@/context/ClientCountryContext"
import { optionTypes } from "../MovieSelectionPane/types/MovieSelectionPaneDropdown.interface"

const atkinsonHyperlegible = Atkinson_Hyperlegible({
  subsets: ["latin"],
  weight: "400"
})

const CountrySelector = () => {
  const [value, setValue] = useState<{ label: string; value: { name: string; code: string } }>()

  const [countries, setCountries] = useState<{ label: string; value: { name: string; code: string } }[]>()
  const [clientCountry, setClientCountry] = useState<{ name: string; code: string }>()

  const animatedComponents = makeAnimated()
  const whiteColourStyle = { color: "white" }

  const clientCountryContext = useClientCountry()

  const { data: countriesResponseData, isLoading: isCountriesLoading } = useCountries(false)
  const { data: geoData, isLoading, error } = useLocale(!!localStorage.getItem("client-country"))

  useEffect(() => {
    if (IS_BROWSER) {
      const storedClientCountry = JSON.parse(localStorage.getItem("client-country") as string)
      if (storedClientCountry) {
        setClientCountry(storedClientCountry)
        setValue({
          label: `${getCountryEmoji({ countryCode: storedClientCountry.code })} ${storedClientCountry.name}`,
          value: { name: storedClientCountry.name, code: storedClientCountry.code }
        })
      }
    }
  }, [])

  useEffect(() => {
    if (isLoading || !geoData) return
    if (error) {
      console.error("Error fetching geolocation:", error)
      return
    }

    const country = { name: geoData.country_name, code: geoData.country_code }

    if (!clientCountry || clientCountry.code !== country.code) {
      setClientCountry(country)
      localStorage.setItem("client-country", JSON.stringify(country))
    }

    setValue({
      label: `${getCountryEmoji({ countryCode: country.code })} ${country.name}`,
      value: { name: country.name, code: country.code }
    })
  }, [geoData, isLoading, error])

  useEffect(() => {
    if (countriesResponseData) {
      const formattedCountries = countriesResponseData
        .map((country: countriesTypes) => ({
          label: (
            <span className="flex">
              {getCountryEmoji({ countryCode: country.iso_3166_1 }) || ""}
              {` ${country.native_name}`}
            </span>
          ),
          value: { name: country.native_name, code: country.iso_3166_1 }
        }))
        .sort((a: { value: { name: string } }, b: { value: { name: string } }) => a.value.name.localeCompare(b.value.name))

      setCountries(formattedCountries)
    }
  }, [countriesResponseData])

  const handleDropdownClick = (newValue: SingleValue<optionTypes<{ name: string; code: string }>>) => {
    if (newValue) {
      setValue(newValue)
      localStorage.setItem("client-country", JSON.stringify({ name: newValue.value?.name, code: newValue.value?.code }))
      clientCountryContext?.updateClientCountry({ name: newValue.value?.name, code: newValue.value?.code })
    }
  }

  useEffect(() => {
    if (countries && countries?.length > 0) {
      const prioritizedCountry =
        countries?.find(country => country.value.name === clientCountry?.name) ||
        countries?.find(country => country.value.name === "United Kingdom") ||
        countries?.find(country => country.value.name === "United States") ||
        countries?.[0]

      setValue(prioritizedCountry)
    }
  }, [clientCountry, countries])

  return (
    <Select
      isSearchable={false}
      className={`px-3 mt-2 ${atkinsonHyperlegible.className}`}
      components={animatedComponents}
      onChange={newValue => handleDropdownClick(newValue as SingleValue<optionTypes<{ name: string; code: string }>>)}
      options={countries}
      value={value}
      isLoading={isLoading}
      placeholder=""
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
          borderRadius: "0.75rem",
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
        }),
        singleValue: base => ({
          ...base,
          ...whiteColourStyle,
          "&:hover": {
            ...whiteColourStyle
          }
        }),
        loadingIndicator: base => ({
          ...base,
          ...whiteColourStyle
        })
      }}
    />
  )
}

export default CountrySelector
