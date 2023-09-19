import React from "react"
import { dataSubtypes } from "@/json/data.interface"
import { capitaliseEachWord } from "@/helpers"


const GameTags: React.FC<{ tags: dataSubtypes[] }> = ({ tags }) => (
    <>
        {tags && tags.length > 0 &&
            <div className="flex my-2 justify-start items-center flex-wrap row-start-1 gap-2 text-xs laptop:text-sm">
                <p className="pr-2">{`${capitaliseEachWord(tags[0].type)}: `}</p>

                {tags?.map(({ title, id: categoryId }) =>
                    (<span key={categoryId} className="rounded-full bg-purple-500 bg-opacity-40 text-xs laptop:text-sm max-w-fit px-3 mx-1 flex">
                        <p className="justify-center items-center m-auto">
                            {capitaliseEachWord(title)}
                        </p>
                    </span>
                ))}
            </div>
        }
    </>
)

export default GameTags