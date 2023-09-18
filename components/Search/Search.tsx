import { faX } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useEffect, useState } from "react"

const Search: React.FC<{ setQuery: (arg0: string) => void }> = ({ setQuery }) => {
    const [input, setInput] = useState("")

    useEffect(() => {
        // Debounce function for less unnecessary calls/passing props
        const delay = 500

        const debounceTimer = setTimeout(() => {
            setQuery(input)
        }, delay)

        return () => clearTimeout(debounceTimer)
    }, [input, setQuery])

    const handleInputChange = (e: { target: { value: React.SetStateAction<string> } }) => {
        setInput(e.target.value)
    }

    return (
        <div className="relative w-min">
            <input
                type="text"
                placeholder="Search games..."
                onChange={handleInputChange}
                maxLength={30}
                value={input}
                className="text-black focus:outline-none focus:ring-0 border-2 focus:border-purple-500 text-lg p-2 rounded-xl w-96"
            />
            { input &&
                <button 
                    type="button" 
                    className="h-full absolute text-black right-4"
                    onClick={() => setInput("")}
                >
                    <FontAwesomeIcon className="h-4 w-4 text-gray-400/50" icon={faX} aria-hidden="true" />
                </button>
            }
        </div>
    )
}

export default Search