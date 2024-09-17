import { IconProp } from "@fortawesome/fontawesome-svg-core"

export interface ToggleButtonTypes {
  state: boolean
  stateSetter: React.Dispatch<React.SetStateAction<boolean>>
  onIcon: IconProp
  offIcon?: IconProp
}
