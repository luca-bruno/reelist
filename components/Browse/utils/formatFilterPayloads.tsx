import { countriesTypes, genreTypes, spokenLanguageTypes } from "@/types/movie.interface"
import { capitalise, getCountryEmoji } from "@/helpers"

export const formatGenres = (genreResponseData: genreTypes[]) =>
  genreResponseData.map(genre => ({
    label: genre.name,
    value: genre.id
  }))

export const formatCountries = (countriesResponseData: countriesTypes[]) =>
  countriesResponseData
    .map(country => ({
      label: (
        <span className="flex">
          {getCountryEmoji({ countryCode: country.iso_3166_1 }) || ""}
          {` ${country.native_name}`}
        </span>
      ),
      value: country.iso_3166_1,
      data: {
        nativeName: country.native_name,
        englishName: country.english_name,
        isoCode: country.iso_3166_1
      }
    }))
    .sort((a: { data: { nativeName: string } }, b: { data: { nativeName: string } }) => a.data.nativeName?.localeCompare(b.data.nativeName))

export const formatLanguages = (languagesResponseData: spokenLanguageTypes[]) => {
  const formattedLanguages = languagesResponseData
    .map(language => ({
      // NOTE: to avoid rendering incomplete/WIP labels (eg. ??????)
      label: language.name && !language.name.includes("?") ? capitalise(language.name) : capitalise(language.english_name),
      value: language.iso_639_1,
      data: {
        nativeName: capitalise(language.name),
        englishName: capitalise(language.english_name),
        isoCode: language.iso_639_1
      }
    }))
    .sort((a: { data: { englishName: string } }, b: { data: { englishName: string } }) => a.data.englishName?.localeCompare(b.data.englishName))

  const noLanguageOption = formattedLanguages.find(language => language.data.isoCode === "xx")
  const remainingLanguages = formattedLanguages.filter(language => language.data.isoCode !== "xx")

  // Prepend the No Language option
  return [noLanguageOption, ...remainingLanguages]
}
