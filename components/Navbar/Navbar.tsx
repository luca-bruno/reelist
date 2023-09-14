import React from "react"
import NavbarButtons from "./NavbarButtons"

const Navbar = () => {
  // TODO: move
  const fadeInTransition = "transition hover:text-green-500 ease-in-out duration-200"


  return (
    <div className='flex justify-between h-12 bg-purple-200'>
      <p className='text-2xl px-4 flex justify-center items-center select-none'>Casino Portal</p>
      <NavbarButtons />
    </div>
  )
}

export default Navbar