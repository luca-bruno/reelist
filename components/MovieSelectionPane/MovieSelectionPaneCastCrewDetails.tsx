import { FC } from "react"
import Image from "next/image"
import { capitaliseEachWord, getCountryEmoji } from "@/helpers"
import moment from "moment"
import MovieSelectionPaneDetailsTypes from "./types/MovieSelectionPaneDetails.interface"
import { TMDB_IMAGE_PATH } from "@/constants"
import fallbackPlaceholder from "@/public/fallbackPlaceholder.jpg"

const MovieSelectionPaneCastCrewDetails: FC<MovieSelectionPaneDetailsTypes> = ({ cast, crew }) => {
  const actors = cast
    ?.filter(item => item.known_for_department === "Acting")
    .map(({ original_name, character, profile_path: profilePath }) => ({ name: original_name, character, profilePath }))

  const groupedByDepartment = crew?.reduce((acc, member) => {
    const { department, name, job } = member

    if (!acc[department]) {
      acc[department] = {
        department: department,
        people: []
      }
    }

    acc[department].people.push({ name, job })

    return acc
  }, {})

  const result = Object.values(groupedByDepartment)

  return (
    <>
      <h2 className="text-lg font-semibold mb-1">Cast</h2>
      <div className="grid grid-cols-2 gap-x-4">
        {actors?.map(({ name, character, profilePath }, index) => (
          <div key={index} className="mb-3 text-sm">
            <div className="grid gap-1">
              <div className="flex justify-between items-center gap-x-4 pl-2 rounded transition duration-200 ease-in-out">
                <div className="flex items-center">
                  <Image
                    unoptimized
                    className="rounded-xl select-none slide_fade_from_left"
                    src={profilePath ? `${TMDB_IMAGE_PATH}${profilePath}` : fallbackPlaceholder}
                    alt={`${name}`}
                    width={30}
                    height={30}
                    draggable={false}
                  />
                  <p className="font-semibold pl-2">{`${capitaliseEachWord(name)}`}</p>
                </div>
                <div>{character && <p className="text-end">{capitaliseEachWord(character)}</p>}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div>
        {result?.map((item, index) => (
          <div key={index} className="mb-3">
            <h2 className="text-lg font-semibold mb-1">{item.department}</h2>
            <div className="grid grid-cols-2 gap-x-4 text-sm">
              {item.people?.map(({ name, job }, idx) => (
                <div key={idx} className="flex justify-between items-center gap-x-4 pl-2 rounded transition duration-200 ease-in-out">
                  <div className="flex items-center">
                    <p className="font-semibold">{`${capitaliseEachWord(name)}`}</p>
                  </div>
                  {job && <p className="text-end">{capitaliseEachWord(job)}</p>}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default MovieSelectionPaneCastCrewDetails
