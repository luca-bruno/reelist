import { buttonStyles } from "@/helpers"
import React from "react"


const ClearFiltersButton: React.FC<{ clearFilters: () => void, haveFiltersBeenSelected: boolean }> = ({ clearFilters, haveFiltersBeenSelected }) => (
  <button
    type="button" 
    className={`w-28 ${buttonStyles} ${!haveFiltersBeenSelected ? "opacity-0" : "opacity-100"}`}
    onClick={() => clearFilters()}
  >
      Clear Filters
  </button>
  )

export default ClearFiltersButton