import "./styles/styles.css"
import { FC } from "react"
import { TagsTypes } from "./types/Tags.interface"

const Tags: FC<{ tags: TagsTypes }> = ({ tags }) => {
  const { title, payload } = tags

  // TODO: fix class name
  return (
    payload &&
    payload.length > 0 && (
      <div className="flex my-2 justify-start items-start  row-start-1 gap-2 text-xs laptop:text-sm">
        <p className="pr-2 w-[5rem]">{`${title}: `}</p>

        <div className="tags pb-2 flex flex-row overflow-x-auto w-[27rem]">
          {payload?.map(({ name }) => (
            <span key={name} className="rounded-full bg-neutral-500 bg-opacity-40 text-xs laptop:text-sm px-3 mx-1 flex">
              <p className="justify-center items-center m-auto w-max">{name}</p>
            </span>
          ))}
        </div>
      </div>
    )
  )
}

export default Tags
