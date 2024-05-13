"use client"

import {
  ExploreProfilesOrderByType,
  LimitType,
  useExploreProfiles,
} from "@lens-protocol/react-web"
import Link from "next/link"

export default function DisplayProfiles() {
  const { data } = useExploreProfiles({
    orderBy: ExploreProfilesOrderByType.MostFollowers,
    limit: LimitType.TwentyFive,
  })

  return (
    <div className=" p-10">
      {data?.map((profile, index) => (
        <div key={index} className="border rounded-lg p-10 mb-4">
          <Link
            href={`/profiles/${profile.handle?.localName}.${profile.handle?.namespace}`}
          >
            <div className="my-14">
              {profile.metadata?.picture?.__typename === "ImageSet" ? (
                <img
                  src={profile.metadata?.picture?.optimized?.uri || ""}
                  width="120"
                  height="120"
                  alt={profile.handle?.fullHandle || ""}
                />
              ) : (
                <div className="w-28 h-28 bg-slate-500" />
              )}
              <h3 className="text-3xl my-4">
                {profile.handle?.localName}.{profile.handle?.namespace}
              </h3>
              <p className="text-xl">{profile.metadata?.bio}</p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  )
}
