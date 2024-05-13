"use client"

import ExplorePublications from "@/components/hooks/DisplayPublications"
import Drop from "@/components/lib/Dropdown"
import { ExplorePublicationsOrderByType } from "@lens-protocol/react-web"
import { useState } from "react"
import { useAccount as useWagmiAccount } from "wagmi"
export default function Publications() {
  const { address } = useWagmiAccount()
  const [type, setType] = useState<ExplorePublicationsOrderByType>(
    ExplorePublicationsOrderByType.TopCommented
  )

  if (!address) return null
  return (
    <div>
      <main className="px-10 py-14">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-3xl font-semibold">Explore Publications</h1>
          <Drop setType={setType} />
        </div>
        <ExplorePublications type={type} />
      </main>
    </div>
  )
}
