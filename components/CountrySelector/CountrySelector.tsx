"use client"

import { useCallback, useEffect, useState } from "react"
import makeAnimated from "react-select/animated"
import Select, { SingleValue } from "react-select"
import { Atkinson_Hyperlegible } from "next/font/google"
import { getCountryEmoji } from "@/helpers"
import { IS_BROWSER } from "@/constants"
import { countriesTypes } from "@/types/movie.interface"
import useCountries from "@/hooks/useCountries/useCountries"
import { useClientCountry } from "@/context/ClientCountryContext"
import { optionTypes } from "../MovieSelectionPane/types/MovieSelectionPaneDropdown.interface"
import getSelectStyles from "./styles"

const atkinsonHyperlegible = Atkinson_Hyperlegible({
  subsets: ["latin"],
  weight: "400"
})

const fetchCountryData = async () => {
  const response = await fetch("https://geolocation-db.com/json/")
  if (!response.ok) {
    throw new Error("Network response was not ok")
  }
  return response.json()
}

const CountrySelector = () => {
  const [value, setValue] = useState<{ label: JSX.Element | string; value: { name: string; code: string } }>()
  const [error, setError] = useState<null | Error>(null)
  const [isLoading, setIsLoading] = useState(true)

  const [countries, setCountries] = useState<{ label: JSX.Element | string; value: { name: string; code: string } }[]>([])
  const [clientLocale, setClientLocale] = useState<{ name: string; code: string } | null>(null)

  const animatedComponents = makeAnimated()

  const clientCountryContext = useClientCountry()

  const { data: countriesResponseData, isLoading: isCountriesLoading } = useCountries(false)

  const createCountryValue = (country: { name: string; code: string }) => ({
    label: `${getCountryEmoji({ countryCode: country.code })} ${country.name}`,
    value: country
  })

  const formatCountries = (countriesResponse: countriesTypes[]) =>
    countriesResponse
      .map(country => ({
        label: (
          <span className="flex">
            {getCountryEmoji({ countryCode: country.iso_3166_1 }) || ""}
            {` ${country.native_name}`}
          </span>
        ),
        value: { name: country.native_name, code: country.iso_3166_1 }
      }))
      .sort((a, b) => a.value.name.localeCompare(b.value.name))

  const getPrioritizedCountry = useCallback(
    (countryList: typeof countries, clientCountry: { name: string; code: string } | null) =>
      countryList.find(country => country.value.name === clientCountry?.name) ||
      countryList.find(country => country.value.name === "United Kingdom") ||
      countryList.find(country => country.value.name === "United States") ||
      countryList[0],
    []
  )

  useEffect(() => {
    const initializeCountry = async () => {
      setIsLoading(true)

      if (IS_BROWSER && localStorage.getItem("client-country")) {
        const storedClientCountry = JSON.parse(localStorage.getItem("client-country") as string)
        setClientLocale(storedClientCountry)
        setValue(createCountryValue(storedClientCountry))
        setIsLoading(false)
        return
      }

      try {
        const result = await fetchCountryData()
        const fetchedCountry = { name: result.country_name, code: result.country_code }
        setClientLocale(fetchedCountry)
        localStorage.setItem("client-country", JSON.stringify(fetchedCountry))
        setValue(createCountryValue(fetchedCountry))
      } finally {
        setIsLoading(false)
      }
    }

    initializeCountry()
  }, [])

  useEffect(() => {
    if (countriesResponseData) {
      const formattedCountries = formatCountries(countriesResponseData)
      setCountries(formattedCountries)
    }
  }, [countriesResponseData])

  useEffect(() => {
    if (countries && countries?.length > 0) {
      const prioritizedCountry = getPrioritizedCountry(countries, clientLocale)
      setValue(prioritizedCountry)
    }
  }, [clientLocale, countries, getPrioritizedCountry])

  const handleDropdownClick = (newValue: SingleValue<optionTypes<{ name: string; code: string }>>) => {
    if (newValue) {
      const { name, code } = newValue.value
      setValue(newValue)
      localStorage.setItem("client-country", JSON.stringify({ name, code }))
      clientCountryContext?.updateClientCountry({ name, code })
    }
  }

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
      styles={getSelectStyles()}
    />
  )
}

export default CountrySelector
