import { FC, Fragment } from "react"
import { Listbox, Transition } from "@headlessui/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck"
import { faChevronDown } from "@fortawesome/free-solid-svg-icons/faChevronDown"
import "./styles/styles.css"
import { transitionStyles, capitaliseEachWord } from "@/helpers"
import { moviesTypes } from "@/types/movies.interface"
import { movieTypes } from "@/types/movie.interface"
import typeToKeyMapper from "./data"
import FilterTypes from "./types/Filter.interface"

const Filter: FC<FilterTypes> = ({ type, selectedFilters, setSelectedFilters }) => {
    const retrieveUniqueFilterOptions = (key: string) => {
        const allRecordsOfType = []
            .map(payload => (payload[key as keyof moviesTypes]))
            .flat()

        if (key === "provider_title") {
            return allRecordsOfType.filter((title, index, self) => title && self.indexOf(title) === index) as string[]
        }

        return allRecordsOfType
            .map(keyItem => ({ title: (keyItem as movieTypes)?.title, id: (keyItem as movieTypes)?.id }))
            .filter(({ title, id }, index, self) => title && self.findIndex((item => item.id === id)) === index)
    }

    return (
        <div className="w-full my-1">
            <Listbox value={selectedFilters} onChange={setSelectedFilters} multiple>
                <div id="filter_listbox_dropdown" className="relative">
                    <Listbox.Button
                        className="laptopM:w-[185px] w-full h-10 tablet:h-12 cursor-select rounded-xl bg-white py-2 pl-3 pr-10 text-left shadow-md 
                          focus:outline-none focus-visible:border-accent-500 focus-visible:ring-2 focus-visible:ring-white 
                          focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
                    >
                        <span className="select-none truncate flex m-auto items-center text-xs tablet:text-lg">
                            {type}
                            <div className="flex justify-center items-center w-6 h-6 
                              bg-accent-400 rounded-full text-white text-xs ml-3 mr-0 mobileXL:mx-3 mx-3 tablet:text-lg"
                            >
                              {selectedFilters.length}
                            </div>
                        </span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <FontAwesomeIcon className="h-3 w-3 tablet:h-5 tablet:w-5 text-black" icon={faChevronDown} aria-hidden="true" />
                        </span>
                    </Listbox.Button>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options
                            className="absolute z-20 mt-1 max-h-60 w-full bg-gray-50 overflow-auto rounded-md py-1
                              shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none text-xs tablet:text-lg"
                        >
                            {retrieveUniqueFilterOptions(typeToKeyMapper[type as keyof typeof typeToKeyMapper]).map(tag => (
                                <Listbox.Option
                                  key={(typeof tag === "string") ? tag : (tag && tag.id)}
                                  className={({ active, selected: isOptionSelected }) =>
                                      `relative cursor-select select-none py-2 pl-10
                                          ${active ? `bg-accent-500/30 ${transitionStyles}` : "text-black"}
                                          ${isOptionSelected ? `bg-accent-300 text-white ${transitionStyles}` : "text-black"}
                                      `}
                                  value={(typeof tag === "string") ? tag : (tag && tag.id)}
                                >
                                    {({ selected: isOptionSelected }) => (
                                        <>
                                            <span className={`block truncate ${isOptionSelected ? "font-medium" : "font-normal"}`}>
                                                {(typeof tag === "string") ? tag : (tag && capitaliseEachWord(tag.title))}
                                            </span>

                                            {isOptionSelected ? (
                                              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                                <FontAwesomeIcon 
                                                  className="h-3 w-3 tablet:h-5 tablet:w-5 text-white" 
                                                  icon={faCheck} 
                                                  aria-hidden="true" 
                                                />
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