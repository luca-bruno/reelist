// eslint-disable-next-line camelcase
import { Oleo_Script, Atkinson_Hyperlegible } from "next/font/google"
import fetchMovies from "@/services/fetchMovies/fetchMovies"
import CarouselList from "@/components/Carousel/CarouselList"
import { movieTypes } from "@/types/movie.interface"

const oleoScript = Oleo_Script({
  subsets: ["latin"],
  weight: "400"
})

const atkinsonHyperlegible = Atkinson_Hyperlegible({
  subsets: ["latin"],
  weight: "400"
})

const HomePage = async () => {
  const movies = (await fetchMovies()) as movieTypes[]

  return (
    <main className={`${atkinsonHyperlegible.className}`}>
      <div className="flex">
        <h1 className={`text-accent-500 text-9xl m-10 select-none ${oleoScript.className}`}>Reelist</h1>

        <div>
          <h2 className="text-accent-500 text-4xl m-10 mb-4 select-none">
            Welcome to
            <span className={`${oleoScript.className}`}>{" Reelist"}</span>!
          </h2>
          <h2 className="text-accent-500 text-xl m-10 mt-0">
            Reelist is your personal movie hub - discover new movies, create personalised lists, find where movies are streaming and show off your
            interests - powered by the TMDb API.
          </h2>
        </div>
      </div>

      <CarouselList {...{ movies }} />
    </main>
  )
}

export default HomePage
