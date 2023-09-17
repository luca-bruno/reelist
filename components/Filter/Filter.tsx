import React, { useState, Fragment } from "react"
import { Listbox, Transition } from "@headlessui/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck, faChevronDown } from "@fortawesome/free-solid-svg-icons"
import data from "@/json/data.json"
import capitaliseEachWord from "@/helpers"
import "./styles/styles.css"
import typeToKeyMapper from "./data"

const Filter: React.FC<{ type: string }> = ({ type }) => {
    const allTitles = (key: string) => {
        const X = data
            .map(payload => payload[key])
            .flat()

        if (key === "provider_title") {
            return X.filter((title, index, self) => title && self.indexOf(title) === index)
        }
        return X.map(keyItem => keyItem?.title).filter((title, index, self) => title && self.indexOf(title) === index)
    }

    const [selected, setSelected] = useState([])

    return (
        <div className="w-full">
            <Listbox value={selected} onChange={setSelected} multiple>
                <div id="filter_listbox_dropdown" className="relative">
                    <Listbox.Button
                        className=" w-full h-12 cursor-select rounded-xl bg-white py-2 pl-3 pr-10 text-left shadow-md 
                                    focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white 
                                    focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
                    >
                        <span className="truncate flex m-auto items-center">
                            {type}
                            <div className="flex justify-center items-center mx-3 w-6 h-6 bg-purple-400 rounded-full text-white">
                                {selected.length}
                            </div>
                        </span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <FontAwesomeIcon className="h-5 w-5 text-black" icon={faChevronDown} aria-hidden="true" />
                        </span>
                    </Listbox.Button>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options
                            className="absolute z-20 mt-1 max-h-60 w-full bg-gray-50 overflow-auto rounded-md py-1 text-base 
                                    shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                        >
                            {allTitles(typeToKeyMapper[type]).map(person => (
                                <Listbox.Option
                                    key={person}
                                    className={({ active, selected: isOptionSelected }) =>
                                        `relative cursor-select select-none py-2 pl-10 
                                                ${active ? " bg-purple-500/30 text-amber-900" : "text-gray-900"}
                                                ${isOptionSelected ? " bg-purple-300 text-white" : "text-gray-900"}
                                        `}
                                    value={person}
                                >
                                    {({ selected: isOptionSelected }) => (
                                        <>
                                            <span
                                                className={`block truncate ${isOptionSelected ? "font-medium" : "font-normal"}`}
                                            >
                                                {capitaliseEachWord(person)}
                                            </span>
                                            {isOptionSelected ? (
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                                    <FontAwesomeIcon className="h-5 w-5 text-white" icon={faCheck} aria-hidden="true" />
                                                </span>
                                            ) : null}
                                        </>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        </div>
    )
}

export default Filter