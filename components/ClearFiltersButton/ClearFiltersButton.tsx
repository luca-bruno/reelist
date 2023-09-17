import { transitionStyles } from "@/helpers"
import React from "react"

const ClearFiltersButton: React.FC<{ clearFilters: () => void }> = ({ clearFilters }) => (
  <button
    type="button" 
    className={`h-full p-2 w-28 m-auto bg-purple-500 rounded-xl ${transitionStyles} hover:bg-purple-300`}
    onClick={() => clearFilters()}
  >
      Clear Filters
  </button>
  )

export default ClearFiltersButton