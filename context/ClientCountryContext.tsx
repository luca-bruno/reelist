"use client"

import React, { createContext, useContext, useState } from "react"

// TODO: split into context, provider & custom hook
const ClientCountryContext = createContext(null)

export const ClientCountryProvider = ({ children }) => {
  const [clientCountry, setClientCountry] = useState(() => {
    if (typeof window !== "undefined") {
      const storedClientCountry = localStorage.getItem("client-country")
      return storedClientCountry ? JSON.parse(storedClientCountry) : null
    }
    return null
  })

  const updateClientCountry = newCountry => {
    localStorage.setItem("client-country", JSON.stringify(newCountry)) // Update local storage
    setClientCountry(newCountry)
  }

  return <ClientCountryContext.Provider value={{ clientCountry, updateClientCountry }}>{children}</ClientCountryContext.Provider>
}

export const useClientCountry = () => {
  return useContext(ClientCountryContext)
}
