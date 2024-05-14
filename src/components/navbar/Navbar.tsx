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
  { href: "/profile", name: "Profile" },
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

// const NoLoginNavbar = () => {
//   const [activeLink, setActiveLink] = useState("/")

//   const handleLinkClick = (link: string) => {
//     setActiveLink(link)
//   }
//   return (
//     <>
//       <div className="w-full h-20 bg-purple-500 sticky top-0">
//         <div className="container mx-auto px-4 h-full">
//           <div className="flex justify-between items-center h-full">
//             <ul className="hidden md:flex gap-x-6 text-white">
//               <li>
//                 <Link href="/">
//                   <p
//                     className={activeLink === "/" ? "font-bold text-lg" : ""}
//                     onClick={() => handleLinkClick("/")}
//                   >
//                     Home
//                   </p>
//                 </Link>
//               </li>
//               <li>
//                 <Link href="/publications">
//                   <p
//                     className={
//                       activeLink === "/publications" ? "font-bold text-lg" : ""
//                     }
//                     onClick={() => handleLinkClick("/publications")}
//                   >
//                     Explore Publications
//                   </p>
//                 </Link>
//               </li>
//               <li>
//                 <Link href="/profiles">
//                   <p
//                     className={
//                       activeLink === "/profiles" ? "font-bold text-lg" : ""
//                     }
//                     onClick={() => handleLinkClick("/profiles")}
//                   >
//                     Explore Profiles
//                   </p>
//                 </Link>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }

// const FullNavbar = () => {
//   const [activeLink, setActiveLink] = useState("/")

//   const handleLinkClick = (link: string) => {
//     setActiveLink(link)
//   }

//   return (
//     <>
//       <div className="w-full h-20 bg-purple-500 sticky top-0">
//         <div className="container mx-auto px-4 h-full">
//           <div className="flex justify-between items-center h-full">
//             <ul className="hidden md:flex gap-x-6 text-white">
//               <li>
//                 <Link href="/">
//                   <p
//                     className={activeLink === "/" ? "font-bold text-lg" : ""}
//                     onClick={() => handleLinkClick("/")}
//                   >
//                     Home
//                   </p>
//                 </Link>
//               </li>
//               <li>
//                 <Link href="/publications">
//                   <p
//                     className={
//                       activeLink === "/publications" ? "font-bold text-lg" : ""
//                     }
//                     onClick={() => handleLinkClick("/publications")}
//                   >
//                     Explore Publications
//                   </p>
//                 </Link>
//               </li>
//               <li>
//                 <Link href="/profiles">
//                   <p
//                     className={
//                       activeLink === "/profiles" ? "font-bold text-lg" : ""
//                     }
//                     onClick={() => handleLinkClick("/profiles")}
//                   >
//                     Explore Profiles
//                   </p>
//                 </Link>
//               </li>
//               <li>
//                 <Link href="/profile">
//                   <p
//                     className={
//                       activeLink === "/profile" ? "font-bold text-lg" : ""
//                     }
//                     onClick={() => handleLinkClick("/profile")}
//                   >
//                     My Profile
//                   </p>
//                 </Link>
//               </li>
//               <li>
//                 <Link href="/post">
//                   <p
//                     className={
//                       activeLink === "/post" ? "font-bold text-lg" : ""
//                     }
//                     onClick={() => handleLinkClick("/post")}
//                   >
//                     Create Post
//                   </p>
//                 </Link>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }
