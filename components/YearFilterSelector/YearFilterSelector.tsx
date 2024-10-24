import { FC, useEffect, useState } from "react"
// import { filterTypes } from "@/types/filter.interface"
import Select, { SingleValue } from "react-select"
import makeAnimated from "react-select/animated"
import { useRouter, useSearchParams } from "next/navigation"
import { getFilterSelectStyles } from "@/helpers"
import { optionTypes } from "../MovieSelectionPane/types/MovieSelectionPaneDropdown.interface"

// Utility function to generate an array of years
const generateYears = (startYear: number, endYear: number) => {
  const years = []
  for (let year = startYear; year <= endYear; year += 1) {
    years.push({ value: year, label: year })
  }

  years.sort((a, b) => b.value - a.value)
  return years
}

const YearFilterSelector: FC = () => {
  const searchParams = useSearchParams()
  const query = searchParams.get("year") || ""
  const [year, setYear] = useState<string>(query)

  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Generate years between 1888 and the current year
  const currentYear = new Date().getFullYear()
  const years = generateYears(1888, currentYear)

  const router = useRouter()

  const updateQueryParams = (action: string, selectedOption: SingleValue<optionTypes>) => {
    const currentQueryParams = new URLSearchParams(window.location.search)

    if (action === "select-option") {
      if (selectedOption?.value) {
        currentQueryParams.set("year", selectedOption?.value)
        setYear(selectedOption?.value)
      }
    } else if (action === "clear") {
      currentQueryParams.delete("year")
    }

    router.push(`?${currentQueryParams.toString()}`)
  }

  const handleYearChange = (selectedOption: SingleValue<optionTypes>, action: string) => {
    updateQueryParams(action, selectedOption)
  }

  return (
    isClient &&
    <div>
      <Select
        instanceId="yearFilter"
        isSearchable
        isClearable
        components={makeAnimated()}
        onChange={(selectedOption, { action }) => handleYearChange(selectedOption as SingleValue<optionTypes>, action)}
        options={years}
        // isLoading={isLoading}
        defaultValue={year && { label: year, value: year }}
        placeholder="🔎 Year"
        classNamePrefix="movie-selection-pane-dropdown"
        styles={getFilterSelectStyles()}
      />
    </div>
  )
}

export default YearFilterSelector
