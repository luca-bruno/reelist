"use client"

import { createContext, useState, useEffect, useContext, ReactNode } from "react"
import { movieTypes } from "@/types/movie.interface"
import { capitalise } from "@/helpers"

interface PlaylistContextType {
  playlists: Record<string, movieTypes[]>
  customPlaylistNames: string[]
  addToPlaylist: (listKey: string, selectedMovie: movieTypes, toggledAddition?: boolean) => void
  createCustomPlaylist: (playlistName: string) => void
}

const PlaylistContext = createContext<PlaylistContextType | undefined>(undefined)

export const usePlaylist = () => {
  const context = useContext(PlaylistContext)
  if (!context) {
    throw new Error("usePlaylist must be used within a PlaylistProvider")
  }
  return context
}

export const PlaylistProvider = ({ children }: { children: ReactNode }) => {
  const [playlists, setPlaylists] = useState<Record<string, movieTypes[]>>({})
  const [customPlaylistNames, setCustomPlaylistNames] = useState<string[]>([])

  useEffect(() => {
    const keys = Object.keys(localStorage)
    const initialPlaylists: Record<string, movieTypes[]> = {}
    const customNames: string[] = []

    keys.forEach(key => {
      const capitalizedKey = capitalise(key)
      const storedList = localStorage.getItem(capitalizedKey)
      if (storedList) {
        initialPlaylists[capitalizedKey] = JSON.parse(storedList)
        customNames.push(capitalizedKey)
      }
    })
    setPlaylists(initialPlaylists)

    const savedCustomPlaylists = JSON.parse(localStorage.getItem("custom-playlists") || "[]")
    setCustomPlaylistNames(savedCustomPlaylists)
  }, [])

  const addToPlaylist = (listKey: string, selectedMovie: movieTypes, toggledAddition: boolean = false) => {
    const playlistKey = capitalise(listKey)
    const existingPlaylist = playlists[playlistKey] || []

    let updatedPlaylist = [...existingPlaylist]

    if (existingPlaylist.some(item => item.id === selectedMovie.id)) {
      if (toggledAddition) {
        updatedPlaylist = updatedPlaylist.filter(item => item.id !== selectedMovie.id)
      }
    } else {
      updatedPlaylist.push(selectedMovie)
    }

    localStorage.setItem(playlistKey, JSON.stringify(updatedPlaylist))
    setPlaylists(prev => ({
      ...prev,
      [playlistKey]: updatedPlaylist
    }))
  }

  const createCustomPlaylist = (playlistName: string) => {
    const capitalizedName = capitalise(playlistName)
    if (!customPlaylistNames.includes(capitalizedName)) {
      setCustomPlaylistNames(prev => [...prev, capitalizedName])
      localStorage.setItem("custom-playlists", JSON.stringify([...customPlaylistNames, capitalizedName]))
    }
  }

  return (
    <PlaylistContext.Provider value={{ playlists, customPlaylistNames, addToPlaylist, createCustomPlaylist }}>{children}</PlaylistContext.Provider>
  )
}
