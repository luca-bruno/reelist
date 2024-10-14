import { movieTypes } from "@/types/movie.interface"

export interface optionTypes<T = unknown> {
  label: string | JSX.Element
  value: string
  data?: T
}

export interface MovieSelectionPaneDropdownTypes {
  selectedMovie: movieTypes
}
