"use client"

import React, { useEffect, useState } from "react"
import { Atkinson_Hyperlegible } from "next/font/google"
import Link from "next/link"
import { transitionStyles } from "@/helpers"
import { IS_BROWSER } from "@/constants"

const atkinsonHyperlegible = Atkinson_Hyperlegible({
  subsets: ["latin"],
  weight: "400"
})

const BaconScoreContainer = () => {
  const [baconNumber, setBaconNumber] = useState<string>()

  useEffect(() => {
    if (IS_BROWSER) {
      setBaconNumber(JSON.parse(localStorage.getItem("bacon-highscore") as string))
    }
  }, [])

  return (
    baconNumber && (
      <Link href={"https://en.wikipedia.org/wiki/Six_Degrees_of_Kevin_Bacon"} target="_blank" rel="noopener noreferrer">
        <button
          className={`px-3 mt-2 flex justify-center items-center h-[38px] rounded-xl bg-black bg-opacity-20 hover:bg-accent-500 ${transitionStyles} select-none gap-x-1.5`}
        >
          🥓
          <div className={`${atkinsonHyperlegible.className}`}>{baconNumber}</div>
        </button>
      </Link>
    )
  )
}

export default BaconScoreContainer
