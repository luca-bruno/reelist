import React from "react"
import { Alata } from "next/font/google"
import NavbarButtons from "./NavbarButtons"
import NavbarButton from "./NavbarButton"

const alata = Alata({ weight: "400", subsets: ["latin"] })

const Navbar = () => (
  <header className={`flex justify-between h-12 bg-primary-500 ${alata.className}`}>
    <p className="text-2xl px-4 flex justify-center items-center select-none text-accent-500">
      <NavbarButton {...{ label: "Reelist", slug: "/" }} />
    </p>
    <NavbarButtons />
  </header>
)

export default Navbar
