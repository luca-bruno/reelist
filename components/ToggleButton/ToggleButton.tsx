import { FC } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { buttonStyles } from "@/helpers"
import { ToggleButtonTypes } from "./types/ToggleButton.interface"

const ToggleButton: FC<ToggleButtonTypes> = ({ state, stateSetter, onIcon, offIcon }) => (
  <button
    type="button"
    className={`w-10 ${buttonStyles}`}
    onClick={() => stateSetter(prev => !prev)}
  >
    <FontAwesomeIcon
      className="h-5 w-5 text-white flex m-auto"
      icon={state ? onIcon : offIcon || onIcon}
      aria-hidden="true"
    />
  </button>
)

export default ToggleButton
