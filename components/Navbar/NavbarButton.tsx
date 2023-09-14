"use client"

import React from "react"
import { usePathname } from "next/navigation"
import NavbarButtonTypes from "./types/NavbarButton.interface"

const NavbarButton: React.FC<NavbarButtonTypes> = ({ label, slug }) => {
    const pathname = usePathname()

    const isOnCurrentButton = slug === pathname

    return (
        <button
            type="button"
            className={`border-red-500 border-b-2 mx-2 ${isOnCurrentButton ? "text-green-500" : ""}`}
        >
            {label}
        </button>
    )
}

export default NavbarButton