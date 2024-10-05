import { useEffect, useState } from "react"
import useCountries from "@/hooks/useCountries/useCountries"
import Select from "react-select"
import { getCountryEmoji } from "@/helpers"
import { countriesTypes } from "@/types/movie.interface"

const CountryFilterSelector = ({ setFilter }) => {
  const [values, setValues] = useState()

  const { data: countriesResponseData } = useCountries()

  useEffect(() => {
    const formattedCountries = countriesResponseData
      ?.map((country: countriesTypes) => ({
        label: (
          <span className="flex">
            {getCountryEmoji({ countryCode: country.iso_3166_1 }) || ""}
            {` ${country.native_name}`}
          </span>
        ),
        value: country.iso_3166_1,
        nativeName: country.native_name, // Adding original name for search
        englishName: country.english_name, // Adding English name for search
        isoCode: country.iso_3166_1 // Adding ISO code for search
      }))
      .sort((a, b) => a.nativeName?.localeCompare(b.nativeName))

    setValues(formattedCountries)
  }, [countriesResponseData])

  const handleCountryChange = selectedOption => {
    const extractValues = selectedOption.map(option => option.value)

    setFilter(prev => ({ ...prev, origin_country: extractValues }))
  }

  const filterOption = (option, inputValue) => {
    // NOTE: Searchable by country code, native name or English-translated name
    const { label, data } = option
    const searchTerm = inputValue.toLowerCase()

    // Use optional chaining and fallback to empty string to prevent errors
    return (
      label.toString().toLowerCase().includes(searchTerm) ||
      (data.nativeName?.toLowerCase() || "").includes(searchTerm) ||
      (data.englishName?.toLowerCase() || "").includes(searchTerm) ||
      (data.isoCode?.toLowerCase() || "").includes(searchTerm)
    )
  }

  return (
    <div>
      <Select
        isMulti
        options={values}
        onChange={selectedOption => handleCountryChange(selectedOption)}
        isSearchable
        placeholder="🔎 Country(ies)"
        filterOption={filterOption}
      />
    </div>
  )
}

export default CountryFilterSelector
