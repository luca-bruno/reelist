import { FC, useEffect, useState } from "react"
import { HEADERS_ALLOW_ORIGIN } from "@/constants"
import Select, { MultiValue } from "react-select"
import makeAnimated from "react-select/animated"
import { getFilterSelectStyles } from "@/helpers"
import { useRouter, useSearchParams } from "next/navigation"
import { optionTypes } from "../MovieSelectionPane/types/MovieSelectionPaneDropdown.interface"

const GenreFilterSelector: FC = () => {
  const searchParams = useSearchParams()
  const query = searchParams.get("genres") || ""

  const [values, setValues] = useState<MultiValue<optionTypes>>([])
  const [genres, setGenres] = useState()

  const router = useRouter()

  const updateQueryParams = (action: string, selectedOption: MultiValue<optionTypes>) => {
    const currentQueryParams = new URLSearchParams(window.location.search)

    if (action === "select-option" || action === "remove-value") {
      const genreValues = selectedOption.map(option => option.value)

      if (genreValues.length > 0) {
        // Update query with the remaining selected genres
        currentQueryParams.set("genres", genreValues.join(","))
        setValues(selectedOption)
      } else {
        // Clear the genre if none are left
        currentQueryParams.delete("genres")
        setValues([]) // Clear the selected genres state
      }
    } else if (action === "clear") {
      currentQueryParams.delete("genres")
      setValues([]) // Clear all genres when action is "clear"
    }

    router.push(`?${currentQueryParams.toString()}`)
  }

  useEffect(() => {
    const loadGenres = async () => {
      const genresResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/genres`, HEADERS_ALLOW_ORIGIN)
      const { genres: genreResponseData } = await genresResponse.json()

      const formatted = genreResponseData.map((genre: { name: string; id: number }) => ({ label: genre.name, value: genre.id }))

      setGenres(formatted)

      if (query) {
        const genreIdsFromQuery = query.split(",")

        const matchedGenres = formatted?.filter((genre: { value: number }) => genreIdsFromQuery.includes(genre.value.toString()))

        setValues(matchedGenres)
      }
    }

    loadGenres()
  }, [query])

  const handleGenreChange = (selectedOption: MultiValue<optionTypes>, action: string) => {
    const delay = 1000

    const debounceTimer = setTimeout(() => {
      updateQueryParams(action, selectedOption)
    }, delay)

    return () => clearTimeout(debounceTimer)
  }

  return (
    <div>
      <Select
        isMulti
        isSearchable
        components={makeAnimated()}
        onChange={(selectedOption, { action }) => handleGenreChange(selectedOption as MultiValue<optionTypes>, action)}
        options={genres}
        // isLoading={isLoading}
        value={values}
        placeholder="🔎 Genre(s)"
        classNamePrefix="movie-selection-pane-dropdown"
        styles={getFilterSelectStyles()}
      />
    </div>
  )
}

export default GenreFilterSelector
