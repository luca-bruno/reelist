import React from "react"
import Image from "next/image"

const GameSelectionPane = () => (
    <div className="flex justify-center col-span-2 bg-red-500 rounded-xl overflow-y-auto m-3">
        <div>
            <Image
                src="/"
                alt="Game"
                width={200}
                height={800}
            />
        </div>
    </div>
)

export default GameSelectionPane