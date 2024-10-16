"use client"

import { createContext, useContext } from "react"

type Genre = {
  label: string
  value: number
}

type GenresContextType = {
  genres: Genre[]
}

const GenresContext = createContext<GenresContextType | undefined>(undefined)

export const useGenres = () => {
  const context = useContext(GenresContext)
  if (!context) {
    throw new Error("useGenres must be used within a GenresProvider")
  }
  return context
}

export const GenresProvider = ({ children, genres }: { children: React.ReactNode; genres: Genre[] }) => (
  <GenresContext.Provider value={{ genres }}>{children}</GenresContext.Provider>
)
