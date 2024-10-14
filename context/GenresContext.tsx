"use client"

// contexts/GenresContext.tsx
import { createContext, useContext } from "react"

// Define the structure of the context value
type Genre = {
  label: string
  value: number
}

type GenresContextType = {
  genres: Genre[]
}

// Create the context with an empty default value
const GenresContext = createContext<GenresContextType | undefined>(undefined)

// Hook to use the GenresContext in components
export const useGenres = () => {
  const context = useContext(GenresContext)
  if (!context) {
    throw new Error("useGenres must be used within a GenresProvider")
  }
  return context
}

// GenresProvider component to wrap around the parts of the app that need access
export const GenresProvider = ({ children, genres }: { children: React.ReactNode; genres: Genre[] }) => (
  <GenresContext.Provider value={{ genres }}>{children}</GenresContext.Provider>
)
