"use client"

import { createContext, FC, ReactNode, useContext, useState, useMemo } from "react"
import { IS_BROWSER } from "@/constants"

interface ClientCountryContextType {
  clientCountry: { name: string; code: string } | null
  updateClientCountry: (country: { name: string; code: string }) => void
}

const ClientCountryContext = createContext<ClientCountryContextType | null>(null)

export const ClientCountryProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [clientCountry, setClientCountry] = useState(() => {
    if (IS_BROWSER) {
      const storedClientCountry = localStorage.getItem("client-country")
      return storedClientCountry ? JSON.parse(storedClientCountry) : null
    }
    return null
  })

  const updateClientCountry = (newCountry: { name: string; code: string }) => {
    localStorage.setItem("client-country", JSON.stringify(newCountry))
    setClientCountry(newCountry)
  }

  const value = useMemo(() => ({ clientCountry, updateClientCountry }), [clientCountry])

  return <ClientCountryContext.Provider value={value}>{children}</ClientCountryContext.Provider>
}

export const useClientCountry = () => useContext(ClientCountryContext)
