import Link from "next/link"

const Navbar = () => {
  return (
    <>
      <div className="w-full h-20 bg-purple-500 sticky top-0">
        <div className="container mx-auto px-4 h-full">
          <div className="flex justify-between items-center h-full">
            <ul className="hidden md:flex gap-x-6 text-white">
              <li>
                <Link href="/">
                  <p>Home</p>
                </Link>
              </li>
              <li>
                <Link href="/profile">
                  <p>My Profile</p>
                </Link>
              </li>
              <li>
                <Link href="/post">
                  <p>Create Post</p>
                </Link>
              </li>
              <li>
                <Link href="/explore">
                  <p>Explore</p>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar
