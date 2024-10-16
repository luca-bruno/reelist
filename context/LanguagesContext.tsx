"use client"

import React, { createContext, useContext, useState, ReactNode } from "react"

interface LanguagesContextType {
  languages: {
    label: string
    value: string
    data?: {
      nativeName: string
      englishName: string
      isoCode: string
    }
  }[]
}

const LanguagesContext = createContext<LanguagesContextType | undefined>(undefined)

export const useLanguages = (): LanguagesContextType => {
  const context = useContext(LanguagesContext)
  if (!context) {
    throw new Error("useLanguages must be used within a LanguageProvider")
  }
  return context
}

export const LanguagesProvider: React.FC<{ children: ReactNode; languages: any[] }> = ({ children, languages }) => {
  return <LanguagesContext.Provider value={{ languages }}>{children}</LanguagesContext.Provider>
}
