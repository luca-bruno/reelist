"use client"

import { FC, useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faX } from "@fortawesome/free-solid-svg-icons/faX"
import { useRouter, useSearchParams } from "next/navigation"

const Search: FC = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const query = searchParams.get("query") || ""
  const [input, setInput] = useState(query)

  // const params = new URLSearchParams()

  const updateQueryParams = () => {
    const currentQueryParams = new URLSearchParams(window.location.search)
    // Update the query parameter
    if (input) {
      currentQueryParams.set("query", input)
    } else {
      currentQueryParams.delete("query") // Remove the query if input is empty
    }

    router.push(`?${currentQueryParams.toString()}`)
  }

  useEffect(() => {
    if (input !== "") localStorage.setItem("latest-search-term", input)
  }, [input])

  useEffect(() => {
    // Debounce function for less unnecessary calls/passing props
    const delay = 1000

    const debounceTimer = setTimeout(() => {
      updateQueryParams()
    }, delay)

    return () => clearTimeout(debounceTimer)
  })

  return (
    <div className="relative mr-3 w-full">
      <input
        type="text"
        placeholder="Search movies..."
        // defaultValue={query}
        onChange={e => setInput(e.target.value)}
        maxLength={50}
        value={input}
        className="text-black focus:outline-none focus:ring-0 border-2 
          focus:border-accent-500 p-2 rounded-xl laptopXL:w-96 w-full text-sm tablet:text-lg"
      />
      {input && (
        <button type="button" className="h-full absolute text-black right-4" onClick={() => setInput("")}>
          <FontAwesomeIcon className="h-4 w-4 text-gray-400/50" icon={faX} aria-hidden="true" />
        </button>
      )}
    </div>
  )
}

export default Search
