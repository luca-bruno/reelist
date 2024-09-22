"use client"

import React, { useEffect, useState } from "react"
import { IS_BROWSER } from "@/constants"
import Carousel from "./Carousel"

const CarouselList = ({ movies }) => {
    const [x, setX] = useState<boolean>()

    useEffect(() => {
        if (IS_BROWSER) {
            const hasUserPreviouslyVisited = localStorage.getItem("has-user-previously-visited")
            if (hasUserPreviouslyVisited) {
                setX(JSON.parse(hasUserPreviouslyVisited))
            }
        }
    }, [])

    return (
        <>
            <Carousel
                {...{
                    title: x ? "Jump Back In" : "Get Started",
                    subtitle: x ? "– with the latest and hottest picks! ️‍🔥" : "– pick a movie and start browsing! 👋",
                    list: movies
                }}
            />

            {x &&
                <>
                    <Carousel
                        {...{
                            title: "Your Favourites ❤️",
                            listKey: "Favourites"
                        }}
                    />

                    <Carousel
                        {...{
                            title: "Watchlist 🍿",
                            listKey: "Watchlist"
                        }}
                    />

                    <Carousel
                        {...{
                            title: "Your Last Search",
                            subtitle: "– \"God\" 🔍"
                            // ,
                            // list: stuff
                        }}
                    />
                </>
            }
        </>
    )
}

export default CarouselList