import { Dispatch, SetStateAction } from "react"
import { movieTypes } from "@/types/movie.interface"

interface CarouselListTypes {
  movies: movieTypes[]
}

interface CarouselTypes {
  title: string
  subtitle?: string
  list?: movieTypes[]
  listKey?: string
  playlists?: string[]
  setPlaylists?: Dispatch<SetStateAction<string[]>>
}

interface CarouselItemTypes {
  id: movieTypes["id"]
  posterPath: movieTypes["poster_path"]
  title: movieTypes["title"]
}

export type { CarouselListTypes, CarouselTypes, CarouselItemTypes }
