import { FC, useEffect, useState } from "react"
import { HEADERS_ALLOW_ORIGIN } from "@/constants"
import { capitalise, getFilterSelectStyles } from "@/helpers"
import Select, { SingleValue } from "react-select"
import { spokenLanguageTypes } from "@/types/movie.interface"
import { useRouter, useSearchParams } from "next/navigation"
import makeAnimated from "react-select/animated"
import { optionTypes } from "../MovieSelectionPane/types/MovieSelectionPaneDropdown.interface"
import { useLanguages } from "@/context/LanguagesContext"

const LanguageFilterSelector: FC = () => {
  const searchParams = useSearchParams()
  const query = searchParams.get("language") || ""

  const { languages } = useLanguages()

  const [values, setValues] = useState<
    (optionTypes<{ nativeName: string; englishName: string; isoCode: string }> | undefined)[]
  >([])
  const [languageOption, setLanguageOption] = useState<optionTypes<{ nativeName: string; englishName: string; isoCode: string }>>()

  const router = useRouter()

  const updateQueryParams = (action: string, selectedOption: SingleValue<optionTypes<{ nativeName: string; englishName: string; isoCode: string }>>) => {
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
    // const loadLanguages = async () => {
      // const languagesResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/languages`, HEADERS_ALLOW_ORIGIN)
      // const languagesResponseData = await languagesResponse.json() as spokenLanguageTypes[]

      // // NOTE: to avoid rendering incomplete/WIP labels (eg. ??????)
      // const formattedLanguages = languagesResponseData
      //   ?.map((language: spokenLanguageTypes) => ({
      //     label: language.name && !language.name.includes("?") ? capitalise(language.name) : capitalise(language.english_name),
      //     value: language.iso_639_1,
      //     data: {
      //       nativeName: capitalise(language.name), // Adding original name for search
      //       englishName: capitalise(language.english_name), // Adding English name for search
      //       isoCode: language.iso_639_1 // Adding ISO code for search
      //     }
      //   }))
      //   .sort((a: { data: { englishName: string } }, b: { data: { englishName: string } }) => a.data.englishName?.localeCompare(b.data.englishName))

      // // Find the No Language option and remove it from the sorted array
      // const noLanguageOption = formattedLanguages.find(language => language.data.isoCode === "xx")
      // const remainingLanguages = formattedLanguages.filter(language => language.data.isoCode !== "xx")

      // // Prepend the No Language option [so it becomes first element]
      // const formatted = [noLanguageOption, ...remainingLanguages]

      // if (formatted) {
        setValues(languages)
      // }

      if (query) {
        const matchedLanguage = languages.find(lang => lang?.value === query)
        setLanguageOption(matchedLanguage) // Set selected language based on query
      }
    // }

    // loadLanguages()
  }, [languages, query])

  // Handle change event when a language is selected
  const handleLanguageChange = (selectedOption: SingleValue<optionTypes<{ nativeName: string; englishName: string; isoCode: string }>>, action: string) => {
    const delay = 1000

    const debounceTimer = setTimeout(() => {
      updateQueryParams(action, selectedOption)

      return () => clearTimeout(debounceTimer)
    }, delay)
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
        onChange={(selectedOption, { action }) => handleLanguageChange(selectedOption as SingleValue<optionTypes<{ nativeName: string; englishName: string; isoCode: string }>>, action)}
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
