import { movieTypes } from "@/types/movies.interface"

interface CarouselTypes {
  title: string
  subtitle?: string
  list?: movieTypes[]
  listKey?: string
}

interface CarouselItemTypes {
  id: movieTypes["id"]
  posterPath: movieTypes["poster_path"]
  title: movieTypes["title"]
}

export type { CarouselTypes, CarouselItemTypes }
