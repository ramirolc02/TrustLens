"use client"

import DisplayProfiles from "@/components/hooks/DisplayProfiles"
import { useAccount as useWagmiAccount } from "wagmi"
export default function Publications() {
  const { address } = useWagmiAccount()
  if (!address) return null
  return (
    <main className="px-10 py-14">
      <h1 className="mb-3 text-3xl font-semibold">Explore Profiles</h1>
      <DisplayProfiles />
    </main>
  )
}
