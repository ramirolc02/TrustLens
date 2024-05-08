"use client"

import ExplorePublications from "@/components/hooks/DisplayPublications"
import { useAccount as useWagmiAccount } from "wagmi"

export default function Publications() {
  const { address } = useWagmiAccount()
  if (!address) return null
  return (
    <main className="px-10 py-14">
      <div>
        <h1 className="mb-3 text-3xl font-semibold">Explore Publications</h1>
      </div>
      <ExplorePublications />
    </main>
  )
}
