import { movieTypes } from "@/types/movie.interface"

export interface optionTypes<T> {
  label: string
  value: T
}

export interface MovieSelectionPaneDropdownTypes {
  selectedMovie: movieTypes
}
