"use client"

import { FC, useEffect } from "react"
import useImage from "@/hooks/useImage/useImage"
import { flag } from "country-emoji"
import Link from "next/link"
import { transitionStyles } from "@/helpers"
import PersonSelectionPanePoster from "./PersonSelectionPanePoster"
import Showcase from "../Showcase"

const PersonSelectionPane: FC<any> = ({ person }) => {
  // TODO: split off and use this template
  // const useCountries = (skipCondition: boolean) => {
  //   const { data, error, isLoading } = useSWR(!skipCondition ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/countries` : null, SWR_FETCHER, {
  //     revalidateOnMount: true,
  //     revalidateOnFocus: false
  //   })

  const {
    hasImageLoaded,
    setHasImageLoaded,
    hasReturnedError,
    setHasReturnedError,
    hasBackgroundImageReturnedError,
    setHasBackgroundImageReturnedError
  } = useImage()
  const {
    profile_path: profilePath,
    biography,
    birthday,
    deathday,
    id,
    movie_credits: { cast = [], crew = [] } = {},
    name,
    known_for_department: knownForDepartment,
    place_of_birth: placeOfBirth
  } = person || {}

  const directed = crew
    ?.filter((item: { job: string }) => item.job === "Director")
    .map(({ id: directedId, poster_path: posterPath, title }: { id: number; poster_path: string; title: string }) => ({
      id: directedId,
      poster_path: posterPath,
      title
    }))

  const written = crew
    ?.filter((item: { job: string }) => item.job === "Writer")
    .map(({ id: writtenId, poster_path: posterPath, title }: { id: number; poster_path: string; title: string }) => ({
      id: writtenId,
      poster_path: posterPath,
      title
    }))

  const produced = crew
    ?.filter((item: { job: string }) => item.job.includes("Producer"))
    .map(({ id: producedId, poster_path: posterPath, title }: { id: number; poster_path: string; title: string }) => ({
      producedId,
      poster_path: posterPath,
      title
    }))

  const isPrimarilyDirector = knownForDepartment === "Directing"

  useEffect(() => {
    setHasImageLoaded(false)
    setHasReturnedError(false)
    setHasBackgroundImageReturnedError(false)
  }, [setHasBackgroundImageReturnedError, setHasImageLoaded, setHasReturnedError])

  return (
    <div className="flex justify-center col-span-1 mobileXL:col-span-2 rounded-xl m-3 overflow-hidden">
      <div className="relative h-full w-full">
        {/* TODO: breadcrumbs navbar */}
        <div
          className="bg-gradient-to-b overflow-y-auto from-primary-300 from-1% to-primary-500 to-50% 
            p-3 absolute bottom-0 rounded-b-xl z-10 w-full h-full"
        >
          <div className="flex">
            <PersonSelectionPanePoster
              {...{
                title: name,
                hasImageLoaded,
                setHasImageLoaded,
                hasReturnedError,
                setHasReturnedError,
                poster: profilePath
              }}
            />

            <div className="w-3/4 p-5 pb-0">
              <div className="flex w-full items-start justify-between">
                <h1
                  className="laptop:text-4xl tablet:text-4xl text-3xl pr-4 mb-2 laptopL:w-full
          laptop:w-[70%] tablet:w-[50%] mobileXL:w-[70%] w-full flex-wrap line-clamp-2 border-b-gray-200 border-b-2 pb-1 border-opacity-10"
                  style={{ textShadow: "8px 6px 16px rgba(0, 0, 0, 1)" }}
                >
                  {name}
                </h1>
                <div className="flex gap-1">
                  <Link href={`https://www.themoviedb.org/person/${id}`} target="_blank" rel="noopener noreferrer">
                    <button
                      type="button"
                      className={`px-3 flex justify-center items-center h-[38px] rounded-xl
                        bg-black bg-opacity-20 hover:bg-accent-500 ${transitionStyles} select-none gap-x-1.5`}
                    >
                      🔗
                    </button>
                  </Link>
                  {/* <Link href={`https://www.themoviedb.org/person/${id}`} target="_blank" rel="noopener noreferrer"> */}
                  <button
                    type="button"
                    className={`px-3 flex justify-center items-center h-[38px] rounded-xl 
                      bg-black bg-opacity-20 hover:bg-accent-500 ${transitionStyles} select-none gap-x-1.5`}
                  >
                    🥓
                  </button>
                  {/* </Link> */}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-x-1 mb-2">
                <div className="flex items-center col-span-2">
                  <span className="ml-0.5 pr-1.5 select-none">{flag(placeOfBirth)}</span>
                  <span>{placeOfBirth}</span>
                </div>

                {birthday && (
                  <div className="flex items-start">
                    <span className="pr-1 select-none">👶</span>
                    <span>{birthday}</span>
                  </div>
                )}

                {deathday && (
                  <div className="flex items-start">
                    <span className="pr-1 select-none">💀</span>
                    <span>{deathday}</span>
                  </div>
                )}
              </div>
              <div className="overflow-y-auto max-h-[10.5rem] pr-2">{biography || "No biography available."}</div>
            </div>
          </div>

          <div className="p-5 rounded-lg shadow-md">
            {isPrimarilyDirector ? (
              <>
                {directed.length >= 1 && <Showcase title="Director" payload={directed} itemsPerPage={8} />}
                {cast.length >= 1 && <Showcase title="Actor" payload={cast} itemsPerPage={4} />}
              </>
            ) : (
              <>
                {cast.length >= 1 && <Showcase title="Actor" payload={cast} itemsPerPage={8} />}
                {directed.length >= 1 && <Showcase title="Director" payload={directed} itemsPerPage={4} />}
              </>
            )}
            {produced.length >= 1 && <Showcase title="Producer" payload={produced} itemsPerPage={4} />}
            {written.length >= 1 && <Showcase title="Writer" payload={written} itemsPerPage={4} />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PersonSelectionPane
