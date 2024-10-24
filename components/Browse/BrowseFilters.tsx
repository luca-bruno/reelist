import { FC } from "react"
import YearFilterSelector from "../YearFilterSelector"
import GenreFilterSelector from "../GenreFilterSelector"
import LanguageFilterSelector from "../LanguageFilterSelector"
import CountryFilterSelector from "../CountryFilterSelector"

const BrowseFilters: FC = () => {
  const filterWrapperStyles =
    "laptopM:[&>*:not(:first-child)]:mx-2 mobileXL:[&>*:not(:first-child)]:mx-0 [&>*:not(:first-child)]:mx-2 laptopM:mr-1 mx-0 mr-3"

  const alignmentStyles = "flex justify-between items-start"
  
  return (
    <>
      <div className={`ml-3 mt-3 ${filterWrapperStyles} ${alignmentStyles} text-black mobileXL:flex-row laptopM:flex-row`}>
        <YearFilterSelector />
        <div className="flex-grow">
          <LanguageFilterSelector />
        </div>
      </div>

      <div className="flex flex-col gap-3 m-3 text-black mobileXL:flex-col laptopM:flex-col">
        {/* make note that every genre search is inclusive (OR / |) */}
        <GenreFilterSelector />
        <CountryFilterSelector />
      </div>
    </>
  )
}

export default BrowseFilters
