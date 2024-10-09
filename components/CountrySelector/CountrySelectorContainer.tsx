import { getCountryEmoji } from "@/helpers"
import fetchCountries from "@/services/fetchCountries/fetchCountries"
import CountrySelector from "./CountrySelector"

const CountrySelectorContainer = async () => {
  const countries = await fetchCountries()

  const formatCountries = () =>
    countries
      .map(country => ({
        label: (
          <span className="flex">
            {getCountryEmoji({ countryCode: country.iso_3166_1 }) || ""}
            {` ${country.native_name}`}
          </span>
        ),
        value: { name: country.native_name, code: country.iso_3166_1 }
      }))
      .sort((a, b) => a.value.name.localeCompare(b.value.name))

  return <CountrySelector {...{ countries: formatCountries() }} />
}

export default CountrySelectorContainer
