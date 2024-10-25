/* eslint-disable react/no-unused-prop-types */
import { FC, useState } from "react"
import useShowcase from "@/hooks/useShowcase/useShowcase"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons/faChevronLeft"
import { faChevronRight } from "@fortawesome/free-solid-svg-icons/faChevronRight"
import { transitionStyles } from "@/helpers"
import MovieCard from "../MovieCardList/MovieCard"

const Showcase: FC<any> = ({ title, payload, itemsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const { startIndex, endIndex, totalPages, currentItems } = useShowcase(payload, currentPage, itemsPerPage)

  return (
    <>
      <div className="flex justify-between w-full my-8 first-of-type:mt-2 last-of-type:mb-2">
        <p>{title}</p>
        {totalPages !== 1 && (
          <div>
            <button
              type="button"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={currentPage === 1 ? "hidden" : ""}
            >
              <FontAwesomeIcon className={`hover:text-accent-500 ${transitionStyles}`} icon={faChevronLeft} />
            </button>

            <span className="px-2">
              Page {currentPage} of {totalPages}
            </span>

            <button
              type="button"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={currentPage === totalPages ? "hidden" : ""}
            >
              <FontAwesomeIcon className={`hover:text-accent-500 ${transitionStyles}`} icon={faChevronRight} />
            </button>
          </div>
        )}
      </div>
      <div className="flex gap-6 flex-wrap">
        {currentItems?.map(({ id, poster_path: posterPath, title: movieTitle }: { id: string; poster_path: string; title: string }) => (
          <MovieCard
            key={id}
            {...{
              id,
              title: movieTitle,
              posterPath
            }}
          />
        ))}
      </div>
    </>
  )
}

export default Showcase
