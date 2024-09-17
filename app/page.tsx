// eslint-disable-next-line camelcase
import { Oleo_Script, Atkinson_Hyperlegible } from "next/font/google"
import Carousel from "@/components/Carousel"

const oleoScript = Oleo_Script({
  subsets: ["latin"],
  weight: "400"
})

const atkinsonHyperlegible = Atkinson_Hyperlegible({
  subsets: ["latin"],
  weight: "400"
})

const stuff = [
  {
    label: "Movie_1",
    src: "https://m.media-amazon.com/images/I/91hHcbk5XbL._AC_SL1500_.jpg"
  },
  {
    label: "Movie_2",
    src: "https://m.media-amazon.com/images/I/91hHcbk5XbL._AC_SL1500_.jpg"
  },
  {
    label: "Movie_3",
    src: "https://m.media-amazon.com/images/I/91hHcbk5XbL._AC_SL1500_.jpg"
  },
  {
    label: "Movie_4",
    src: "https://m.media-amazon.com/images/I/91hHcbk5XbL._AC_SL1500_.jpg"
  },
  {
    label: "Movie_5",
    src: "https://m.media-amazon.com/images/I/91OG5kLZ1UL._AC_SL1500_.jpg"
  }
]

const HomePage = () => (
  <main className={`${atkinsonHyperlegible.className}`}>
    <div className="flex">
      <h1 className={`text-accent-500 text-9xl m-10 ${oleoScript.className}`}>
        Reelist
      </h1>

      <div>
        <h2 className="text-accent-500 text-4xl m-10 mb-4">
          Welcome to
          <span className={`${oleoScript.className}`}>
            {" Reelist"}
          </span>
          !
        </h2>
        <h2 className="text-accent-500 text-xl m-10 mt-0">
          Reelist is your personal movie hub - discover new movies, create personalised
          lists, find where movies are streaming and show off your interests - powered by the OMDb API.
        </h2>
      </div>
    </div>

    {/* TODO: Generate random list of latest current films - use as default list on /browse initialLoad */}
    <Carousel
      {...{
        title: "Get Started",
        subtitle: "– pick a movie and start browsing! 👋",
        list: stuff
      }}
    />






    {/* Render if returning user, load from session data */}

    <Carousel
      {...{
        title: "Jump Back In 🤙",
        list: stuff
      }}
    />

    <Carousel
      {...{
        title: "Your Favourites ❤️",
        list: stuff
      }}
    />

    <Carousel
      {...{
        title: "Your Last Search",
        subtitle: "– \"God\" 🔍 ",
        list: stuff
      }}
    />

    <Carousel
      {...{
        title: "Watchlist 🍿",
        list: stuff
      }}
    />

    <Carousel
      {...{
        title: "Emma's Halloween 👻🎃✨",
        list: stuff
      }}
    />
  </main>
)

export default HomePage
