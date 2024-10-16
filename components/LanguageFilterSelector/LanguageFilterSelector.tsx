import { FC, useEffect, useState } from "react"
import { getFilterSelectStyles } from "@/helpers"
import Select, { SingleValue } from "react-select"
import { useRouter, useSearchParams } from "next/navigation"
import makeAnimated from "react-select/animated"
import { useLanguages } from "@/context/LanguagesContext"
import { optionTypes } from "../MovieSelectionPane/types/MovieSelectionPaneDropdown.interface"

const LanguageFilterSelector: FC = () => {
  const searchParams = useSearchParams()
  const query = searchParams.get("language") || ""

  const { languages } = useLanguages()

  const [values, setValues] = useState<(optionTypes<{ nativeName: string; englishName: string; isoCode: string }> | undefined)[]>([])
  const [languageOption, setLanguageOption] = useState<optionTypes<{ nativeName: string; englishName: string; isoCode: string }>>()

  const router = useRouter()

  const updateQueryParams = (
    action: string,
    selectedOption: SingleValue<optionTypes<{ nativeName: string; englishName: string; isoCode: string }>>
  ) => {
    const currentQueryParams = new URLSearchParams(window.location.search)

    if (action === "select-option") {
      if (selectedOption?.value) {
        currentQueryParams.set("language", selectedOption?.value)
        setLanguageOption(selectedOption)
      }
    } else if (action === "clear") {
      currentQueryParams.delete("language")
      setLanguageOption(undefined)
    }

    router.push(`?${currentQueryParams.toString()}`)
  }

  useEffect(() => {
    setValues(languages)

    if (query) {
      const matchedLanguage = languages.find(lang => lang?.value === query)
      setLanguageOption(matchedLanguage)
    }
  }, [languages, query])

  const handleLanguageChange = (
    selectedOption: SingleValue<optionTypes<{ nativeName: string; englishName: string; isoCode: string }>>,
    action: string
  ) => {
    updateQueryParams(action, selectedOption)
  }

  const filterOption = (option: { label: string; data: { nativeName: string; englishName: string; isoCode: string } }, inputValue: string) => {
    const searchTerm = inputValue?.toLowerCase()

    // Destructure data from option for better readability
    const {
      label,
      data: { nativeName, englishName, isoCode }
    } = option

    // Check if the search term matches any of the fields
    return (
      label?.toLowerCase().includes(searchTerm) ||
      nativeName?.toLowerCase().includes(searchTerm) ||
      englishName?.toLowerCase().includes(searchTerm) ||
      isoCode?.toLowerCase().includes(searchTerm)
    )
  }

  return (
    <div>
      <Select
        isSearchable
        isClearable
        components={makeAnimated()}
        onChange={(selectedOption, { action }) =>
          handleLanguageChange(selectedOption as SingleValue<optionTypes<{ nativeName: string; englishName: string; isoCode: string }>>, action)
        }
        options={values}
        // isLoading={isLoading}
        value={languageOption}
        placeholder="🔎 Language"
        filterOption={(option, inputValue) =>
          filterOption(option as { label: string; data: { nativeName: string; englishName: string; isoCode: string } }, inputValue)
        }
        classNamePrefix="movie-selection-pane-dropdown"
        styles={getFilterSelectStyles()}
      />
    </div>
  )
}

export default LanguageFilterSelector
