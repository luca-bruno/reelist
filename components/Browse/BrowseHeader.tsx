import { FC, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons/faArrowLeft"
import { faArrowRight } from "@fortawesome/free-solid-svg-icons/faArrowRight"
import { faRecycle } from "@fortawesome/free-solid-svg-icons/faRecycle"
import { buttonStyles, transitionStyles } from "@/helpers"
import { useRouter } from "next/navigation"
import Search from "../Search"

const alignmentStyles = "flex justify-start items-start"

const BrowseHeader: FC<any> = ({ page, setPage, movies, showMoreResults }) => {
  const router = useRouter()

  useEffect(() => {
    const currentQueryParams = new URLSearchParams(window.location.search)
    const x = currentQueryParams.get("page")

    if (x) {
      const parsedPage = parseInt(x, 10)
      if (!isNaN(parsedPage) && parsedPage !== page) {
        console.log("Page exists in URL and is different:", parsedPage)
        setPage(parsedPage) // Update state only if the page has changed
      }
    } else {
      console.log("No page in URL, setting to 1")
      currentQueryParams.set("page", "1")
      const newUrl = `${window.location.pathname}?${currentQueryParams.toString()}`
      router.push(newUrl)
    }
  }, [router]) // Run only on mount

  // This effect handles URL updates when the page state changes
  useEffect(() => {
    const currentQueryParams = new URLSearchParams(window.location.search)
    currentQueryParams.set("page", page.toString())
    const newUrl = `${window.location.pathname}?${currentQueryParams.toString()}`
    router.push(newUrl)
  }, [page, router]) // Run when `page` state changes

  return (
    <div className={`${alignmentStyles} ml-3 mt-3 mr-2`}>
      <Search />

      <div className="m-auto mobileL:mr-1 mobileXL:h-10 h-max flex ml-0">
        <button type="button" className={`w-10 ${buttonStyles}`} disabled={!showMoreResults} onClick={() => setPage(prev => prev - 1)}>
          <FontAwesomeIcon
            className={`h-5 w-5 text-white flex m-auto ${transitionStyles} ${!showMoreResults ? "opacity-0" : "opacity-100"}`}
            icon={faRecycle}
            aria-hidden="true"
          />
        </button>
        <button type="button" className={`w-10 ${buttonStyles}`} disabled={page === 1} onClick={() => setPage(prev => prev - 1)}>
          <FontAwesomeIcon
            className={`h-5 w-5 text-white flex m-auto ${transitionStyles} ${page === 1 ? "opacity-0" : "opacity-100"}`}
            icon={faArrowLeft}
            aria-hidden="true"
          />
        </button>

        <button type="button" className={`w-10 ${buttonStyles}`} disabled={movies && movies.length < 20} onClick={() => setPage(prev => prev + 1)}>
          <FontAwesomeIcon
            className={`h-5 w-5 text-white flex m-auto ${transitionStyles}
                   ${movies && movies.length < 20 ? "opacity-0" : "opacity-100"}
                   `}
            icon={faArrowRight}
            aria-hidden="true"
          />
        </button>
      </div>
    </div>
  )
}

export default BrowseHeader
