import React from "react"
import MovieSelectionPaneDetailsTypes from "./types/MovieSelectionPaneDetails.interface"


const MovieSelectionPaneDetails: React.FC<MovieSelectionPaneDetailsTypes> = ({ title }) => (
  <>
    <p className="laptop:text-5xl tablet:text-4xl text-3xl pr-4 py-2 rounded-xl laptopL:w-full
    laptop:w-[75%] tablet:w-[50%] mobileXL:w-[75%] w-full flex-wrap"
        style={{ textShadow: "8px 6px 16px rgba(0, 0, 0, 1)"}}
    >
        {title}
    </p>

    {/* <p className="text-sm">{`Provided by ${providerTitle}`}</p> */}
  </>
)

export default MovieSelectionPaneDetails