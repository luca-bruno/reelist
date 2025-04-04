"use client"

import { FC, useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { transitionStyles } from "@/helpers"
import { TMDB_IMAGE_PATH } from "@/constants"
import { movieTypes, providerTypes } from "@/types/movie.interface"
import Select, { SingleValue } from "react-select"
import makeAnimated from "react-select/animated"
import { optionTypes } from "./types/MovieSelectionPaneDropdown.interface"
import { useClientCountry } from "../../context/ClientCountryContext"

interface MovieSelectionPaneProviders {
  watchProviders: movieTypes["watch/providers"]
}

const MovieSelectionPaneProviders: FC<MovieSelectionPaneProviders> = ({ watchProviders }) => {
  const animatedComponents = makeAnimated()
  const whiteColourStyle = { color: "white" }

  const clientCountryContext = useClientCountry()

  const [providerPlatforms, setProviderPlatforms] = useState<{ label: string; value: string }[]>()

  const [methodValue, setMethodValue] = useState<optionTypes>()

  const countryProviders = clientCountryContext?.clientCountry && watchProviders.results[clientCountryContext?.clientCountry.code]

  const isProvidersAvailableInClientCountry = Object.keys(watchProviders.results).some(x => x === clientCountryContext?.clientCountry?.code)

  const handleDropdownClick2 = (newValue: SingleValue<optionTypes>) => {
    if (newValue) {
      setMethodValue(newValue)
    }
  }

  useEffect(() => {
    if (watchProviders && countryProviders && isProvidersAvailableInClientCountry) {
      const results = []

      const hasRent = Object.keys(countryProviders).some(x => x === "rent")
      const hasBuy = Object.keys(countryProviders).some(x => x === "buy")
      const hasStreaming = Object.keys(countryProviders).some(x => x === "flatrate")

      if (hasRent) results.push({ label: "Rent", value: "rent" })
      if (hasBuy) results.push({ label: "Buy", value: "buy" })
      if (hasStreaming) results.push({ label: "Streaming", value: "flatrate" })

      setProviderPlatforms(results)
    }
  }, [countryProviders, watchProviders, clientCountryContext?.clientCountry])

  useEffect(() => {
    if (watchProviders && countryProviders && isProvidersAvailableInClientCountry) {
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
          className={`py-1.5 text-sm 
            ${
              Object.keys(watchProviders?.results).length > 0 && isProvidersAvailableInClientCountry ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
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
        className={`grid grid-cols-5 h-[7.5rem] mb-2 
    ${watchProviders?.results && Object.keys(watchProviders.results).length > 0 ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      >
        {methodValue?.value?.toLowerCase() &&
          countryProviders?.[methodValue?.value as "flatrate" | "rent" | "buy"]?.map(
            ({ provider_id: providerId, logo_path: logoPath, provider_name: providerName }: providerTypes) => (
              <Link key={providerId} href={countryProviders?.link || ""} target="_blank" rel="noopener noreferrer" legacyBehavior>
                <div className="flex justify-center items-start h-full">
                  <Image
                    unoptimized
                    id={String(providerId)}
                    className={`rounded-lg ${transitionStyles} w-[36px] h-[36px] cursor-pointer m-1 select-none`}
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

      <div
        className={`text-end text-xs mt-2
          ${
            Object.keys(watchProviders?.results).length > 0 && isProvidersAvailableInClientCountry ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
      >
        <em className="flex gap-2 m-1 justify-end">
          Provided by
          <Link className="cursor-pointer" href="https://www.justwatch.com/" target="_blank" rel="noopener noreferrer">
            <Image
              unoptimized
              alt="JustWatch"
              draggable="false"
              className={`flex justify-center m-0 mt-0.5 items-center h-[18px] w-[65px] select-none grayscale hover:filter-none ${transitionStyles}`}
              src="https://widget.justwatch.com/assets/JW_logo_color_10px.svg"
              width={65}
              height={18}
            />
          </Link>
        </em>
      </div>
    </>
  )
}

export default MovieSelectionPaneProviders
