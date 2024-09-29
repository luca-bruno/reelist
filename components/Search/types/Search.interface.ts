import { Dispatch, SetStateAction } from "react"

export interface SearchTypes {
  setQuery: Dispatch<SetStateAction<string>>
}
