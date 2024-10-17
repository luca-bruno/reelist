"use client"

import React, { createContext, useContext } from "react"

type CountryData = {
  label: JSX.Element
  value: string
  data: {
    nativeName: string
    englishName: string
    isoCode: string
  }
}

type CountriesContextType = {
  countries: CountryData[]
}

const CountriesContext = createContext<CountriesContextType | undefined>(undefined)

export const useCountries = () => {
  const context = useContext(CountriesContext)
  if (!context) {
    throw new Error("useCountries must be used within a CountriesProvider")
  }
  return context
}

export const CountriesProvider: React.FC<{ children: React.ReactNode; countries: CountryData[] }> = ({ children, countries }) => {
  return <CountriesContext.Provider value={{ countries }}>{children}</CountriesContext.Provider>
}
