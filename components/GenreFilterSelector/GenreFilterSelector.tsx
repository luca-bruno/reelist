import { FC, useEffect, useState } from "react"
import Select, { MultiValue } from "react-select"
import makeAnimated from "react-select/animated"
import { getFilterSelectStyles } from "@/helpers"
import { useRouter, useSearchParams } from "next/navigation"
import { useGenres } from "@/context/GenresContext"
import { optionTypes } from "../MovieSelectionPane/types/MovieSelectionPaneDropdown.interface"

const GenreFilterSelector: FC = () => {
  const searchParams = useSearchParams()
  const query = searchParams.get("genres") || ""
  const { genres } = useGenres()

  const [values, setValues] = useState<MultiValue<optionTypes>>([])

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
    if (query) {
      const genreIdsFromQuery = query.split(",")
      const matchedGenres = genres
        ?.filter((genre: { value: number }) => genreIdsFromQuery.includes(genre.value.toString()))
        .map(genre => ({
          ...genre,
          value: genre.value.toString()
        }))
      setValues(matchedGenres)
    }
  }, [genres, query])

  const handleGenreChange = (selectedOption: MultiValue<optionTypes>, action: string) => {
    updateQueryParams(action, selectedOption)
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
