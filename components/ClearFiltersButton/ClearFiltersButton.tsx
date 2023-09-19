import { buttonStyles } from "@/helpers"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFilterCircleXmark } from "@fortawesome/free-solid-svg-icons"
import React from "react"


const ClearFiltersButton: React.FC<{ clearFilters: () => void, haveFiltersBeenSelected: boolean }> = ({ clearFilters, haveFiltersBeenSelected }) => (
      <button
        type="button" 
        className={`w-40 mobileXL:w-10 laptopL:w-40 ${buttonStyles} ${!haveFiltersBeenSelected ? "opacity-0" : "opacity-100"}`}
        disabled={!haveFiltersBeenSelected}
        onClick={() => clearFilters()}
      >
        <div className="laptopL:flex laptopL:px-2 mobileXL:hidden flex px-2">
          <FontAwesomeIcon className="h-5 w-5 text-white m-auto pr-2" icon={faFilterCircleXmark} aria-hidden="true" />
          <p>Clear Filters</p>
        </div>
          <FontAwesomeIcon className="h-5 w-5 text-white m-auto laptopL:hidden mobileXL:flex hidden" icon={faFilterCircleXmark} aria-hidden="true" />
      </button>
)

export default ClearFiltersButton