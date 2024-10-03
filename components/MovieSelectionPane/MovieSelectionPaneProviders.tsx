import { FC, useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { transitionStyles } from "@/helpers"
import { IS_BROWSER, TMDB_IMAGE_PATH } from "@/constants"
import { movieTypes, providerTypes } from "@/types/movie.interface"
import Select, { SingleValue } from "react-select"
import makeAnimated from "react-select/animated"
import { optionTypes } from "./types/MovieSelectionPaneDropdown.interface"

interface MovieSelectionPaneProviders {
  watchProviders: movieTypes["watch/providers"]
}

const MovieSelectionPaneProviders: FC<MovieSelectionPaneProviders> = ({ watchProviders }) => {
  const animatedComponents = makeAnimated()
  const whiteColourStyle = { color: "white" }

  const [clientCountry, setClientCountry] = useState<{ name: string; code: string }>()
  const [providerPlatforms, setProviderPlatforms] = useState<{ label: string; value: string }[]>()

  const [methodValue, setMethodValue] = useState<{ label: string; value: string }>()

  const countryProviders = clientCountry && watchProviders.results[clientCountry.code]

  const handleDropdownClick2 = (newValue: SingleValue<optionTypes<string>>) => {
    if (newValue) {
      setMethodValue(newValue)
    }
  }

  useEffect(() => {
    if (IS_BROWSER) {
      const storedClientCountry = localStorage.getItem("client-country") as string
      setClientCountry(JSON.parse(storedClientCountry))
    }
  }, [])

  useEffect(() => {
    if (watchProviders && countryProviders) {
      const results = []

      const hasRent = Object.keys(countryProviders).some(x => x === "rent")
      const hasBuy = Object.keys(countryProviders).some(x => x === "buy")
      const hasStreaming = Object.keys(countryProviders).some(x => x === "flatrate")

      if (hasRent) results.push({ label: "Rent", value: "rent" })
      if (hasBuy) results.push({ label: "Buy", value: "buy" })
      if (hasStreaming) results.push({ label: "Streaming", value: "flatrate" })

      setProviderPlatforms(results)
    }
  }, [countryProviders, watchProviders])

  useEffect(() => {
    if (providerPlatforms && providerPlatforms?.length > 0) {
      const prioritizedPlatformType = providerPlatforms.find(result => result.value === "flatrate") || providerPlatforms[0]
      setMethodValue(prioritizedPlatformType)
    }
  }, [providerPlatforms])

  return (
    <>
      <div className="w-full">
        <Select
          isSearchable={false}
          className={`py-1.5 text-sm ${Object.keys(watchProviders?.results).length > 0 ? "opacity-100" : "opacity-0 pointer-events-none"}`}
          components={animatedComponents}
          onChange={newValue => handleDropdownClick2(newValue as SingleValue<optionTypes<string>>)}
          options={providerPlatforms}
          value={methodValue}
          placeholder="Select provider type"
          classNamePrefix="movie-selection-pane-dropdown"
          styles={{
            control: (base, state) => ({
              ...base,
              backgroundColor: state.isFocused ? "#E64833" : "gray",
              borderRadius: "0.75rem",
              border: "none",
              opacity: state.isFocused ? 1 : 0.8,
              boxShadow: state.isFocused ? "0 0 0 2px rgba(251, 146, 60, 0.5)" : "none",
              "&:hover": {
                opacity: 1,
                backgroundColor: "#E64833"
              }
            }),
            menu: base => ({
              ...base,
              marginTop: "-2px",
              backgroundColor: "#E64833",
              borderRadius: "0.75rem",
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
            }),
            menuList: base => ({
              ...base,
              height: "min-content",
              paddingBottom: "10px"
            }),
            option: base => ({
              ...base,
              cursor: "pointer",
              borderRadius: "0.5rem",
              backgroundColor: "#E64833",
              ...whiteColourStyle,
              "&:hover": {
                backgroundColor: "#ec7b69"
              }
            }),
            placeholder: base => ({
              ...base,
              ...whiteColourStyle
            }),
            input: base => ({
              ...base,
              ...whiteColourStyle
            }),
            noOptionsMessage: base => ({
              ...base,
              ...whiteColourStyle
            }),
            dropdownIndicator: (base, state) => ({
              ...base,
              ...whiteColourStyle,
              "&:hover": {
                ...whiteColourStyle
              },
              transition: "transform 0.3s ease",
              transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : "rotate(0deg)"
            }),
            singleValue: base => ({
              ...base,
              ...whiteColourStyle,
              "&:hover": {
                ...whiteColourStyle
              }
            })
          }}
        />
      </div>

      <div
        className={`grid grid-cols-5 h-20 mb-2 
    ${watchProviders?.results && Object.keys(watchProviders.results).length > 0 ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      >
        {methodValue?.value?.toLowerCase() &&
          countryProviders?.[methodValue?.value as "flatrate" | "rent" | "buy"]?.map(
            ({ provider_id: providerId, logo_path: logoPath, provider_name: providerName }: providerTypes) => (
              <Link key={providerId} href={countryProviders?.link || ""} target="_blank" rel="noopener noreferrer" legacyBehavior>
                <div className="flex justify-center items-center h-full">
                  <Image
                    unoptimized
                    id={String(providerId)}
                    className={`rounded-lg ${transitionStyles} cursor-pointer m-1 select-none`}
                    src={`${TMDB_IMAGE_PATH}${logoPath}`}
                    alt={`${providerName || "Provider"} icon`}
                    width={36}
                    height={36}
                    draggable={false}
                  />
                </div>
              </Link>
            )
          )}
      </div>

      <div className={`text-end text-xs mt-2 ${Object.keys(watchProviders?.results).length > 0 ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
        <em>
          Provided by
          <Link className="cursor-pointer" href="https://www.justwatch.com/" target="_blank" rel="noopener noreferrer">
            <strong className={`mx-1 hover:text-[#DDAD00] ${transitionStyles}`}>JustWatch</strong>
          </Link>
        </em>
      </div>
    </>
  )
}

export default MovieSelectionPaneProviders
