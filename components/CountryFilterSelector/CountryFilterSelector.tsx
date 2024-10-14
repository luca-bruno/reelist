import { FC, useEffect, useState } from "react"
import Select, { MultiValue } from "react-select"
import { getCountryEmoji, getFilterSelectStyles } from "@/helpers"
import { countriesTypes } from "@/types/movie.interface"
import makeAnimated from "react-select/animated"
import { useRouter, useSearchParams } from "next/navigation"
import { HEADERS_ALLOW_ORIGIN } from "@/constants"
import { useCountries } from "@/context/CountriesContext"
import { optionTypes } from "../MovieSelectionPane/types/MovieSelectionPaneDropdown.interface"

const CountryFilterSelector: FC = () => {
  const searchParams = useSearchParams()
  const query = searchParams.get("countries") || ""

  const { countries } = useCountries()

  const [values, setValues] = useState<(optionTypes<{ nativeName: string; englishName: string; isoCode: string }> | undefined)[]>()

  const [selectedCountries, setSelectedCountries] = useState<
    MultiValue<
      optionTypes<{
        nativeName: string
        englishName: string
        isoCode: string
      }>
    >
  >([])

  const router = useRouter()

  const updateQueryParams = (
    action: string,
    selectedOption: MultiValue<
      optionTypes<{
        nativeName: string
        englishName: string
        isoCode: string
      }>
    >
  ) => {
    const currentQueryParams = new URLSearchParams(window.location.search)
    const countryValues = selectedOption.map(option => option.value)

    const updatedCountries = action === "select-option" ? selectedOption : selectedCountries.filter(country => countryValues.includes(country.value))

    if (updatedCountries.length > 0) {
      currentQueryParams.set("countries", updatedCountries.map(c => c.value).join(","))
      setSelectedCountries(updatedCountries)
    } else {
      currentQueryParams.delete("countries")
      setSelectedCountries([])
    }

    router.push(`?${currentQueryParams.toString()}`)
  }

  useEffect(() => {
    // const loadCountries = async () => {
    // const countriesResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/countries`, HEADERS_ALLOW_ORIGIN)
    // const countriesResponseData = (await countriesResponse.json()) as countriesTypes[]

    // const formattedCountries = countriesResponseData
    //   ?.map((country: countriesTypes) => ({
    //     label: (
    //       <span className="flex">
    //         {getCountryEmoji({ countryCode: country.iso_3166_1 }) || ""}
    //         {` ${country.native_name}`}
    //       </span>
    //     ),
    //     value: country.iso_3166_1,
    //     data: {
    //       nativeName: country.native_name,
    //       englishName: country.english_name,
    //       isoCode: country.iso_3166_1
    //     }
    //   }))
    //   .sort((a: { data: { nativeName: string } }, b: { data: { nativeName: string } }) => a.data.nativeName?.localeCompare(b.data.nativeName))

    setValues(countries)

    if (query) {
      const countriesIdsFromQuery = query.split(",")
      const matchedCountries = countries?.filter((country: { value: string }) => countriesIdsFromQuery.includes(country.value))
      setSelectedCountries(matchedCountries)
    }
    // }

    // loadCountries()
  }, [countries, query, setSelectedCountries])

  const handleCountryChange = (
    selectedOption: MultiValue<
      optionTypes<{
        nativeName: string
        englishName: string
        isoCode: string
      }>
    >,
    action: string
  ) => {
    const delay = 1000

    const debounceTimer = setTimeout(() => {
      updateQueryParams(action, selectedOption)
    }, delay)

    return () => clearTimeout(debounceTimer)
  }

  const filterOption = (option: { label: JSX.Element; data: { nativeName: string; englishName: string; isoCode: string } }, inputValue: string) => {
    // NOTE: Searchable by country code, native name, or English-translated name
    const searchTerm = inputValue?.toLowerCase()

    const {
      label,
      data: { nativeName, englishName, isoCode }
    } = option

    // Destructure data from option for better readability
    // const { label, nativeName, englishName, isoCode } = option.data

    // Perform the search on the labelString, nativeName, englishName, and isoCode
    return (
      label?.props.children[1]?.toString().toLowerCase().includes(searchTerm) ||
      nativeName?.toLowerCase().includes(searchTerm) ||
      englishName?.toLowerCase().includes(searchTerm) ||
      isoCode?.toLowerCase().includes(searchTerm)
    )
  }

  return (
    <div>
      <Select
        isMulti
        isSearchable
        components={makeAnimated()}
        onChange={(selectedOption, { action }) =>
          handleCountryChange(
            selectedOption as MultiValue<
              optionTypes<{
                nativeName: string
                englishName: string
                isoCode: string
              }>
            >,
            action
          )
        }
        options={values}
        // isLoading={isLoading}
        value={selectedCountries}
        placeholder="🔎 Country(ies)"
        filterOption={(option, inputValue) =>
          filterOption(option as unknown as { label: JSX.Element; data: { nativeName: string; englishName: string; isoCode: string } }, inputValue)
        }
        classNamePrefix="movie-selection-pane-dropdown"
        styles={getFilterSelectStyles()}
      />
    </div>
  )
}

export default CountryFilterSelector
