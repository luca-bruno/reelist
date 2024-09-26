import { Dispatch, SetStateAction } from "react"
import { IconProp } from "@fortawesome/fontawesome-svg-core"

export interface ToggleButtonTypes {
  state: boolean
  stateSetter: Dispatch<SetStateAction<boolean>>
  onIcon: IconProp
  offIcon?: IconProp
}
