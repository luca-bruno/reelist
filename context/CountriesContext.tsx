"use client"

// contexts/CountriesContext.tsx
import React, { createContext, useContext, useState } from "react"

// Define the shape of a country
type CountryData = {
  label: JSX.Element // For rendering emoji and name
  value: string // ISO code
  data: {
    nativeName: string
    englishName: string
    isoCode: string
  }
}

// Define the context type
type CountriesContextType = {
  countries: CountryData[]
  selectedCountries: CountryData[]
  setSelectedCountries: React.Dispatch<React.SetStateAction<CountryData[]>>
}

// Create the context with an initial undefined value
const CountriesContext = createContext<CountriesContextType | undefined>(undefined)

// Custom hook to use the CountriesContext
export const useCountries = () => {
  const context = useContext(CountriesContext)
  if (!context) {
    throw new Error("useCountries must be used within a CountriesProvider")
  }
  return context
}

// Provider component
export const CountriesProvider: React.FC<{ children: React.ReactNode; countries: CountryData[] }> = ({ children, countries }) => {
  return <CountriesContext.Provider value={{ countries }}>{children}</CountriesContext.Provider>
}
