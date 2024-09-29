import { FC } from "react"
import { capitaliseEachWord } from "@/helpers"
import { TagsTypes } from "./types/Tags.interface"

const Tags: FC<{ tags: TagsTypes }> = ({ tags }) => {
  const { title, payload } = tags

  return (
      payload && payload.length > 0 && (
        <div className="flex my-2 justify-start items-center flex-wrap row-start-1 gap-2 text-xs laptop:text-sm">
          <p className="pr-2">{`${title}: `}</p>

          {payload?.map(({ name }) => (
            <span
              key={name}
              className="rounded-full bg-neutral-500 bg-opacity-40 text-xs laptop:text-sm max-w-fit px-3 mx-1 flex"
            >
              <p className="justify-center items-center m-auto">
                {capitaliseEachWord(name)}
              </p>
            </span>
          ))}
        </div>
      )
  )
}

export default Tags
