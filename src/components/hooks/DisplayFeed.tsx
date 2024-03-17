import { ProfileId, useFeed } from "@lens-protocol/react"

export default function DisplayFeed({ profileId }: { profileId: ProfileId }) {
  const { data, loading, error } = useFeed({
    where: {
      for: profileId,
    },
  })

  if (loading) return <div>Loading...</div>

  if (error) return <div>Error: {error.message}</div>

  return (
    <ul>
      {data.map((item, idx) => (
        <li key={`${item.root.id}-${idx}`}>
          {/* How to display the feed ? Create Component  */}
        </li>
      ))}
    </ul>
  )
}
