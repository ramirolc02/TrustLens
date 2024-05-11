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
        <div>
          <h1 className="mb-3 text-3xl font-semibold">Explore Publications</h1>
        </div>
        <Drop setType={setType} />
        <ExplorePublications type={type} />
      </main>
    </div>
  )
}
