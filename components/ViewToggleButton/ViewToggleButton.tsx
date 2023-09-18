import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faList, faGrip } from "@fortawesome/free-solid-svg-icons"
import { buttonStyles } from "@/helpers"
import { ViewToggleButtonTypes } from "./types/ViewToggleButton.interface"

const ViewToggleButton: React.FC<ViewToggleButtonTypes> = ({ isDisplayingGridView, setIsDisplayingGridView }) => (
    <button 
        type="button" 
        className={`w-10 ${buttonStyles}`}
        onClick={() => setIsDisplayingGridView(prev => !prev)}
    >
        <FontAwesomeIcon className="h-5 w-5 text-white flex m-auto" icon={isDisplayingGridView ? faList : faGrip} aria-hidden="true" />
    </button>
)

export default ViewToggleButton