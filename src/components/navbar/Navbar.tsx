"use client"

import { useActivePath } from "@/utils/navbar-helper"
import {
  SessionType,
  useSession as useLensSession,
} from "@lens-protocol/react-web"
import Link from "next/link"

type NavigationItem = {
  href: string
  name: string
}

const restrictedNavigation: NavigationItem[] = [
  { href: "/", name: "Home" },
  { href: "/profiles", name: "Profiles" },
  { href: "/publications", name: "Publications" },
]
const fullNavigation: NavigationItem[] = [
  { href: "/", name: "Home" },
  { href: "/myprofile", name: "Profile" },
  { href: "/post", name: "Post" },
  { href: "/profiles", name: "Profiles" },
  { href: "/publications", name: "Publications" },
]

export default function Navbar() {
  const { data: session } = useLensSession()
  const checkActivePath = useActivePath()

  const navigation =
    session && session.type === SessionType.WithProfile
      ? fullNavigation
      : restrictedNavigation

  return (
    <>
      <div className="w-full h-20 bg-purple-500 sticky top-0">
        <div className="container mx-auto px-4 h-full">
          <div className="flex justify-between items-center h-full">
            <nav>
              <ul className="hidden md:flex gap-x-6 text-white">
                {navigation.map(({ href, name }) => (
                  <li key={href}>
                    <Link href={href}>
                      <span
                        className={
                          checkActivePath(href) ? "font-bold text-lg" : ""
                        }
                      >
                        {name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  )
}
