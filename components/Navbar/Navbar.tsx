// eslint-disable-next-line camelcase
import { Oleo_Script } from "next/font/google"
import NavbarButton from "./NavbarButton"
import CountrySelectorContainer from "../CountrySelector"
import BaconScoreContainer from "../BaconScore/BaconScoreContainer"

const oleoScript = Oleo_Script({
  subsets: ["latin"],
  weight: "400"
})

const Navbar = () => (
  <header className={`flex justify-between h-12 ${oleoScript.className}`}>
    <p className="text-4xl px-3 mt-2 flex justify-center items-center select-none text-accent-500">
      <NavbarButton {...{ label: "Reelist", slug: "/" }} />
    </p>

    <div className="flex justify-center items-center">
      <BaconScoreContainer />
      <CountrySelectorContainer />
    </div>

    {/* <NavbarButtons /> */}
  </header>
)

export default Navbar
