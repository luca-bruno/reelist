import React from "react"
import GameSelectionPaneDetailsTypes from "./types/GameSelectionPaneDetails.interface"


const GameSelectionPaneDetails: React.FC<GameSelectionPaneDetailsTypes> = ({ name, providerTitle }) => (
  <>
    <p className="laptop:text-5xl tablet:text-4xl text-3xl pr-4 py-2 rounded-xl laptopL:w-full
    laptop:w-[75%] tablet:w-[50%] mobileXL:w-[75%] w-full flex-wrap"
        style={{ textShadow: "8px 6px 16px rgba(0, 0, 0, 1)"}}
    >
        {name}
    </p>

    <p className="text-sm">{`Provided by ${providerTitle}`}</p>
  </>
)

export default GameSelectionPaneDetails