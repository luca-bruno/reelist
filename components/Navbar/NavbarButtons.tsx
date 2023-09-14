import React from "react"
import buttons from "./data"
import NavbarButton from "./NavbarButton"

const NavbarButtons = () => (
  <div className='flex justify-center items-center px-4 text-xl'>
    {buttons.map(({ key, label, slug }) => (
      <NavbarButton key={key} {...{ label, slug }} />
    ))}
  </div>
)

export default NavbarButtons