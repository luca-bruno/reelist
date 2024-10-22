import { FC } from "react"
import MovieSelectionPaneCastCrewDetailsTypes from "./types/MovieSelectionPaneCastCrewDetails.interface"
import MovieSelectionPaneCastCrewDetailsItem from "./MovieSelectionPaneCastCrewDetailsItem"

const MovieSelectionPaneCastCrewDetails: FC<MovieSelectionPaneCastCrewDetailsTypes> = ({ cast, crew }) => {
  const directors = crew
    ?.filter(item => item.job === "Director")
    .map(({ original_name, profile_path: profilePath, id }) => ({ name: original_name, profilePath, id }))

  const actors = cast
    ?.filter(item => item.known_for_department === "Acting")
    .map(({ original_name, character, profile_path: profilePath, id }) => ({ name: original_name, character, profilePath, id }))

  const groupedByDepartment = crew?.reduce(
    (acc, member) => {
      const { department, name, job, id } = member

      if (!acc[department]) {
        acc[department] = {
          department,
          people: []
        }
      }

      acc[department].people.push({ name, job, id })

      return acc
    },
    {} as { [department: string]: { department: string; people: { name: string; job: string; id: number }[] } }
  )

  const result = Object.values(groupedByDepartment || {})

  return (
    <>
      <h2 className="text-lg font-semibold mb-1">Director(s)</h2>
      <div className="grid grid-cols-2 gap-x-4">
        {directors?.map(({ name, profilePath, id }) => <MovieSelectionPaneCastCrewDetailsItem key={id} {...{ name, profilePath, id }} />)}
      </div>
      <h2 className="text-lg font-semibold mb-1">Cast</h2>
      <div className="grid grid-cols-2 gap-x-4">
        {actors?.map(({ name, character, profilePath, id }) => (
          <MovieSelectionPaneCastCrewDetailsItem key={id} {...{ name, profilePath, id, character }} />
        ))}
      </div>

      <div>
        {result?.map(item => (
          // TODO: maybe integrate into MovieSelectionPaneCastCrewDetailsItem too?
          <div key={item.department} className="mb-3">
            <h2 className="text-lg font-semibold mb-1">{item.department}</h2>
            <div className="grid grid-cols-2 gap-x-4 text-sm">
              {item.people?.map(({ name, job, id }) => (
                <div key={id} className="flex justify-between items-center gap-x-4 pl-2 rounded transition duration-200 ease-in-out">
                  <div className="flex items-center">
                    <p className="font-semibold">{`${name}`}</p>
                  </div>
                  {job && <p className="text-end">{job}</p>}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  )}

export default MovieSelectionPaneCastCrewDetails
