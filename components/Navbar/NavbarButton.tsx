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
                className={`text-accent-500 
                    ${!isOnCurrentButton ? `${transitionStyles} hover:text-accent-500` : ""} 
                    ${isOnCurrentButton ? "border-accent-500 border-b-4" : "border-transparent border-b-4"}`}
            >
                {label}
            </button>
        </Link>
    )
}

export default NavbarButton
