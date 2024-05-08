"use client"

import {
  SessionType,
  useSession as useLensSession,
} from "@lens-protocol/react-web"
import Link from "next/link"
import { useState } from "react"

export default function Navbar() {
  const { data: session } = useLensSession()

  if (!session || !(session.type === SessionType.WithProfile)) {
    return <NoLoginNavbar />
  } else {
    return <FullNavbar />
  }
}
const NoLoginNavbar = () => {
  const [activeLink, setActiveLink] = useState("/")

  const handleLinkClick = (link: string) => {
    setActiveLink(link)
  }
  return (
    <>
      <div className="w-full h-20 bg-purple-500 sticky top-0">
        <div className="container mx-auto px-4 h-full">
          <div className="flex justify-between items-center h-full">
            <ul className="hidden md:flex gap-x-6 text-white">
              <li>
                <Link href="/">
                  <p
                    className={activeLink === "/" ? "font-bold text-lg" : ""}
                    onClick={() => handleLinkClick("/")}
                  >
                    Home
                  </p>
                </Link>
              </li>
              <li>
                <Link href="/publications">
                  <p
                    className={
                      activeLink === "/publications" ? "font-bold text-lg" : ""
                    }
                    onClick={() => handleLinkClick("/publications")}
                  >
                    Explore Publications
                  </p>
                </Link>
              </li>
              <li>
                <Link href="/profiles">
                  <p
                    className={
                      activeLink === "/profiles" ? "font-bold text-lg" : ""
                    }
                    onClick={() => handleLinkClick("/profiles")}
                  >
                    Explore Profiles
                  </p>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

const FullNavbar = () => {
  const [activeLink, setActiveLink] = useState("/")

  const handleLinkClick = (link: string) => {
    setActiveLink(link)
  }

  return (
    <>
      <div className="w-full h-20 bg-purple-500 sticky top-0">
        <div className="container mx-auto px-4 h-full">
          <div className="flex justify-between items-center h-full">
            <ul className="hidden md:flex gap-x-6 text-white">
              <li>
                <Link href="/">
                  <p
                    className={activeLink === "/" ? "font-bold text-lg" : ""}
                    onClick={() => handleLinkClick("/")}
                  >
                    Home
                  </p>
                </Link>
              </li>
              <li>
                <Link href="/publications">
                  <p
                    className={
                      activeLink === "/publications" ? "font-bold text-lg" : ""
                    }
                    onClick={() => handleLinkClick("/publications")}
                  >
                    Explore Publications
                  </p>
                </Link>
              </li>
              <li>
                <Link href="/profiles">
                  <p
                    className={
                      activeLink === "/profiles" ? "font-bold text-lg" : ""
                    }
                    onClick={() => handleLinkClick("/profiles")}
                  >
                    Explore Profiles
                  </p>
                </Link>
              </li>
              <li>
                <Link href="/profile">
                  <p
                    className={
                      activeLink === "/profile" ? "font-bold text-lg" : ""
                    }
                    onClick={() => handleLinkClick("/profile")}
                  >
                    My Profile
                  </p>
                </Link>
              </li>
              <li>
                <Link href="/post">
                  <p
                    className={
                      activeLink === "/post" ? "font-bold text-lg" : ""
                    }
                    onClick={() => handleLinkClick("/post")}
                  >
                    Create Post
                  </p>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
