"use client"

import React from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { transitionStyles } from "@/helpers"
import NavbarButtonTypes from "./types/NavbarButton.interface"

const NavbarButton: React.FC<NavbarButtonTypes> = ({ label, slug }) => {
    const pathname = usePathname()

    const isOnCurrentButton = slug === pathname

    return (
        <Link href={slug}>
            <button
                type="button"
                className={`mx-2 text-white ${!isOnCurrentButton ? `${transitionStyles} hover:border-purple-500 border-b-4` : ""} 
                    ${isOnCurrentButton ? "border-purple-500 border-b-4" : "border-transparent border-b-4"}`}
            >
                {label}
            </button>
        </Link>
    )
}

export default NavbarButton