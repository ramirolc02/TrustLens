import { usePathname } from "next/navigation"

export function useActivePath(): (path: string) => boolean {
  const pathname = usePathname()
  console.log(pathname)

  const checkActivePath = (path: string) => {
    if (path === "/" && pathname !== path) {
      return false
    }
    return pathname.startsWith(`${path}`)
  }

  return checkActivePath
}
