'use client'

import { useAuth } from "@/context/authContext"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

const navbar = () => {
    const { isAuthenticated, logout } = useAuth()
    const [loading, setLoading] = useState(false)

    const pathname = usePathname()

    useEffect(() => {
        setLoading(false)
    }, [pathname])

    return (
        <nav className="w-full border-b border-gray-200 shadow-sm fixed top-0 left-0 z-50 bg-white">
            <div className="container mx-auto flex justify-between items-center min-h-20 px-2 sm:px-4 lg:px-6 bg-white ">

            </div>
        </nav>

    )
}

export default navbar;

