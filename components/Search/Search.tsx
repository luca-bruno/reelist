"use client"

import { Dispatch, FC, SetStateAction, useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faX } from "@fortawesome/free-solid-svg-icons/faX"

interface SearchTypes {
  setQuery: Dispatch<SetStateAction<string>>
}

const Search: FC<SearchTypes> = ({ setQuery }) => {
  const [input, setInput] = useState("")

  useEffect(() => {
    if (input !== "") localStorage.setItem("latest-search-term", input)
  }, [input])

  useEffect(() => {
    // Debounce function for less unnecessary calls/passing props
    const delay = 500

    const debounceTimer = setTimeout(() => {
      setQuery(input)
    }, delay)

    return () => clearTimeout(debounceTimer)
  }, [input, setQuery])

  return (
    <div className="relative mr-3 w-full">
      <input
        type="text"
        placeholder="Search movies..."
        onChange={e => setInput(e.target.value)}
        maxLength={50}
        value={input}
        className="text-black focus:outline-none focus:ring-0 border-2 
          focus:border-accent-500 p-2 rounded-xl laptopXL:w-96 w-full text-sm tablet:text-lg"
      />
      {input && (
        <button
          type="button"
          className="h-full absolute text-black right-4"
          onClick={() => setInput("")}
        >
          <FontAwesomeIcon className="h-4 w-4 text-gray-400/50" icon={faX} aria-hidden="true" />
        </button>
      )}
    </div>
  )
}

export default Search
