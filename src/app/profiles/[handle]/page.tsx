"use client"
import { PublicationsFrom } from "@/components/hooks/DisplayPublications"
import FollowButton from "@/components/hooks/FollowProfile"
import { useProfile } from "@lens-protocol/react-web"

export default function Profile({ params }: { params: { handle: string } }) {
  const handleFormat = params.handle.split(".")[0]

  const { data: profile, loading } = useProfile({
    forHandle: `lens/${handleFormat}`,
  })
  console.log(params.handle)

  return (
    <main className="px-10 py-14">
      <div className="space-y-4">
        <h1 className="mb-3 text-3xl font-semibold">
          Explore {profile?.handle?.localName}.{profile?.handle?.namespace}{" "}
          Profile
        </h1>
        <div className="my-14">
          {profile?.metadata?.picture?.__typename === "ImageSet" ? (
            <img
              src={profile.metadata?.picture?.optimized?.uri || ""}
              width="120"
              height="120"
              alt={profile.handle?.fullHandle || ""}
            />
          ) : (
            <div className="w-28 h-28 bg-slate-500" />
          )}
          <p className="text-xl">{profile?.metadata?.bio}</p>
        </div>
        <div>
          <strong>Handle:</strong> {params.handle}
        </div>
        <div>
          <strong>ID:</strong> {profile?.id}
        </div>
        {profile?.id ? (
          <div>
            <FollowButton profile={profile} />
          </div>
        ) : (
          <div>loading...</div>
        )}
        <h2 className="mb-3 text-3xl font-semibold">Publications</h2>
        {profile?.id ? (
          <div>
            <PublicationsFrom profileid={profile.id} />
          </div>
        ) : (
          <div>loading...</div>
        )}
      </div>
    </main>
  )
}
