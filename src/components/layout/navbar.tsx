'use client'

import { useAuth } from "@/context/authContext"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Logo from "../logo"
import { Button } from "../ui/button"

export const Navbar = () => {
    const { logout, user, isAuthenticated } = useAuth()
    const [loading, setLoading] = useState(false)

    const router = useRouter()

    const handleLogout = () => {
        setLoading(true)
        logout()
        router.push("/")
    }


    return (
        <nav className="w-full border-b border-gray-200 shadow-sm fixed top-0 left-0 z-50 bg-white">
            <div className="container mx-auto flex justify-between items-center min-h-20 px-2 sm:px-4 lg:px-6 bg-white ">
                <div className="flex flex-col">
                    <Logo variant="horizontal" size="md" />
                    <p className="text-sm italic text-slate-600">{user?.name}</p>
                </div>

                {isAuthenticated &&
                    <Button variant={"outline"} className="px-8 cursor-pointer border-slate-500 text-slate-800" onClick={handleLogout} disabled={loading}>
                        Sair
                    </Button>
                }

            </div>
        </nav>

    )
}

export default Navbar;

