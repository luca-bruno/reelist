"use client"

import { FC, useCallback, useEffect, useState } from "react"
import { HEADERS_ALLOW_ORIGIN, IS_BROWSER } from "@/constants"
import makeAnimated from "react-select/animated"
import Select, { SingleValue } from "react-select"
import { Atkinson_Hyperlegible } from "next/font/google"
import { useClientCountry } from "@/context/ClientCountryContext"
import { getCountryEmoji } from "@/helpers"
import { optionTypes } from "../MovieSelectionPane/types/MovieSelectionPaneDropdown.interface"
import getSelectStyles from "./styles"

const atkinsonHyperlegible = Atkinson_Hyperlegible({
  subsets: ["latin"],
  weight: "400"
})

// NOTE: Fetching client's locale client-side (& non-SWR) due to its skip condition being based on localStorage value
const fetchClientLocale = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/locale`, { headers: HEADERS_ALLOW_ORIGIN.headers, cache: "force-cache" })
  if (!response.ok) {
    throw new Error("Network response was not ok")
  }
  return response.json()
}

const CountrySelector: FC<{ countries: optionTypes<{ name: string; code: string }>[] }> = ({ countries }) => {
  const [value, setValue] = useState<optionTypes<{ name: string; code: string }> | undefined>()
  const [isLoading, setIsLoading] = useState(true)

  const [clientLocale, setClientLocale] = useState<{ name: string; code: string } | null>(null)

  const clientCountryContext = useClientCountry()

  const createCountryValue = (country: { name: string; code: string }) => ({
    label: `${getCountryEmoji({ countryCode: country.code })} ${country.name}`,
    value: country.code,
    data: country
  })

  const getPrioritizedCountry = useCallback(
    (countryList: optionTypes<{ name: string; code: string }>[], clientCountry: { name: string; code: string } | null) =>
      countryList.find(country => country.data?.name === clientCountry?.name) ||
      countryList.find(country => country.data?.name === "United Kingdom") ||
      countryList.find(country => country.data?.name === "United States") ||
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
        const result = await fetchClientLocale()
        const fetchedCountry = { name: result.country_name, code: result.country_code }
        setClientLocale(fetchedCountry)
        setValue(createCountryValue(fetchedCountry))
        clientCountryContext?.updateClientCountry(fetchedCountry)
      } finally {
        setIsLoading(false)
      }
    }

    initializeCountry()
  }, [clientCountryContext])

  useEffect(() => {
    if (countries && countries?.length > 0 && clientLocale) {
      const prioritizedCountry = getPrioritizedCountry(countries, clientLocale)
      // Ensure data is not undefined before setting it
      if (prioritizedCountry?.data) {
        setValue(prioritizedCountry)
      }
    }
  }, [clientLocale, countries, getPrioritizedCountry])

  const handleDropdownClick = (newValue: SingleValue<optionTypes<{ name: string; code: string }>>) => {
    if (newValue) {
      const { name = "", code = "" } = newValue.data || {}
      setValue(newValue)
      clientCountryContext?.updateClientCountry({ name, code })
    }
  }
  return (
    <Select
      isSearchable={false}
      className={`px-3 mt-2 ${atkinsonHyperlegible.className}`}
      components={makeAnimated()}
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
