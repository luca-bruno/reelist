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
        <input
            type="text"
            placeholder="Search"
            onChange={handleInputChange}
            maxLength={30}
            className="text-black text-lg p-2 mt-3 rounded-xl flex justify-start items-start w-[50%] ml-3"
        />
    )
}

export default Search