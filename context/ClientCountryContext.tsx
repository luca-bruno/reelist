"use client"

import { createContext, FC, ReactNode, useContext, useState } from "react"

interface ClientCountryContextType {
  clientCountry: { name: string; code: string } | null
  updateClientCountry: (country: { name: string; code: string }) => void
}

// TODO: split into context, provider & custom hook
const ClientCountryContext = createContext<ClientCountryContextType | null>(null)

export const ClientCountryProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [clientCountry, setClientCountry] = useState(() => {
    if (typeof window !== "undefined") {
      const storedClientCountry = localStorage.getItem("client-country")
      return storedClientCountry ? JSON.parse(storedClientCountry) : null
    }
    return null
  })

  const updateClientCountry = (newCountry: { name: string; code: string }) => {
    localStorage.setItem("client-country", JSON.stringify(newCountry))
    setClientCountry(newCountry)
  }

  return <ClientCountryContext.Provider value={{ clientCountry, updateClientCountry }}>{children}</ClientCountryContext.Provider>
}

export const useClientCountry = () => {
  return useContext(ClientCountryContext)
}
