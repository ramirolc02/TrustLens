import {
  profileId,
  useProfileFollowers,
  useProfileFollowing,
} from "@lens-protocol/react-web"

export function ProfileFollowers({ profileid }: { profileid: string }) {
  const {
    data: profiles,
    error,
    loading,
  } = useProfileFollowers({
    of: profileId(profileid),
  })

  if (loading) return <div>Loading...</div>

  if (error) return <div>Error: {error.message}</div>

  return <h1 className="text-4xl">Followers: {profiles.length}</h1>
}

export function ProfileFollowing({ profileid }: { profileid: string }) {
  const {
    data: profiles,
    error,
    loading,
  } = useProfileFollowing({
    for: profileId(profileid),
  })

  if (loading) return <div>Loading...</div>

  if (error) return <div>Error: {error.message}</div>

  return <h1 className="text-4xl">Following: {profiles.length}</h1>
}
