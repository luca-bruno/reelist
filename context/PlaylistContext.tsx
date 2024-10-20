"use client"

import { createContext, useState, useEffect, useContext, ReactNode, useMemo } from "react"
import { movieTypes } from "@/types/movie.interface"
import { capitalise } from "@/helpers"
import { IS_BROWSER } from "@/constants"

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
    if (IS_BROWSER) {
      const initialPlaylists: Record<string, movieTypes[]> = {}
      const savedCustomPlaylists = JSON.parse(localStorage.getItem("custom-playlists") || "[]")

      const playlistKeys = ["Favourites", "Watchlist", ...savedCustomPlaylists]
      playlistKeys.forEach(key => {
        const storedList = localStorage.getItem(key)
        if (storedList) {
          initialPlaylists[key] = JSON.parse(storedList)
        }
      })
    }
  }, [])

  const contextValue = useMemo(() => {
    const addToPlaylist = (listKey: string, selectedMovie: movieTypes, toggledAddition = false) => {
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

    return {
      playlists,
      customPlaylistNames,
      addToPlaylist,
      createCustomPlaylist
    }
  }, [playlists, customPlaylistNames])

  return <PlaylistContext.Provider value={contextValue}>{children}</PlaylistContext.Provider>
}
