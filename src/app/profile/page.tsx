"use client"

import { PublicationsFrom } from "@/components/hooks/DisplayPublications"
import { useProfiles } from "@lens-protocol/react-web"
import Image from "next/image"
import { useAccount as useWagmiAccount } from "wagmi"
import { lensConfig } from "../../components/providers/Web3Provider"
import profilePic from "../../utils/images/profile.png"

export default function ProfileWrapper() {
  const { address } = useWagmiAccount()

  if (!address) return null

  return <Profile address={address} />
}

function Profile({ address }: { address: string }) {
  const { data } = useProfiles({
    where: {
      ownedBy: [address],
    },
  })

  if (!data || !data.length) return null
  const profile = data[data.length - 1]
  if (!profile) return null

  if (lensConfig.environment.name === "development") {
    return (
      <main className="px-10 py-14 space-y-4">
        <h1 className="mb-3 text-3xl font-semibold">
          Profile: {profile.handle?.localName}
        </h1>
        <div>
          <a
            rel="no-opener"
            target="_blank"
            href={`https://testnet.hey.xyz/u/${profile.handle?.localName}`}
          >
            <div className="border rounded-lg p-10">
              <div>
                {profile.metadata?.picture?.__typename === "ImageSet" && (
                  <Image
                    src={profile?.metadata?.picture?.optimized?.uri ?? ""}
                    className="rounded w-[200px]"
                    alt={"Lens Profile Picture"}
                  />
                )}
                {!profile.metadata?.picture && (
                  <Image
                    src={profilePic}
                    className="rounded w-[200px]"
                    alt={"Profile Picture"}
                  />
                )}
              </div>
              <div className="mt-4">
                <p className="text-lg">{profile?.metadata?.displayName}</p>
                <p className="text-muted-foreground font-medium">
                  {profile?.handle?.localName}.{profile?.handle?.namespace}
                </p>
              </div>
            </div>
          </a>
          <h3 className="mb-3 text-2xl font-semibold mt-4">Publications:</h3>
          {profile?.id ? (
            <PublicationsFrom profileid={profile.id} />
          ) : (
            <div>loading...</div>
          )}
        </div>
      </main>
    )
  } else {
    return (
      <main className="px-10 py-14">
        <div>
          <a
            rel="no-opener"
            target="_blank"
            href={`https://hey.xyz//u/${profile.handle?.localName}`}
          >
            <div className="border rounded-lg p-10">
              <div>
                {profile.metadata?.picture?.__typename === "ImageSet" && (
                  <img
                    src={profile?.metadata?.picture?.optimized?.uri}
                    className="rounded w-[200px]"
                  />
                )}
              </div>
              <div className="mt-4">
                <p className="text-lg">{profile?.metadata?.displayName}</p>
                <p className="text-muted-foreground font-medium">
                  {profile?.handle?.localName}.{profile?.handle?.namespace}
                </p>
              </div>
              {profile?.id ? (
                <PublicationsFrom profileid={profile.id} />
              ) : (
                <div>loading...</div>
              )}
            </div>
          </a>
        </div>
      </main>
    )
  }
}
