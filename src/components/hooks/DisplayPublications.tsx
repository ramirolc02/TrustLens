import {
  ExplorePublicationType,
  ExplorePublicationsOrderByType,
  useExplorePublications,
} from "@lens-protocol/react"

export default function ExplorePublications() {
  const { data, error, loading } = useExplorePublications({
    where: {
      publicationTypes: [ExplorePublicationType.Post],
    },
    orderBy: ExplorePublicationsOrderByType.TopCommented,
  })

  if (loading) return <p>Loading...</p>

  if (error) return <p>Error: {error.message}</p>

  return (
    <ul>
      {data.map((publication: any, index: number) => (
        <div key={index} className="py-4 bg-zinc-900 rounded mb-3 px-4">
          <p>{publication.metadata.content}</p>
          {publication.metadata?.asset?.image?.optimized?.uri && (
            <img
              width="400"
              height="400"
              className="rounded-xl mt-6 mb-2"
              src={publication.metadata?.asset?.image?.optimized?.uri}
            />
          )}
          {/* {publication.metadata?.asset?.video?.uri && (
            <video
              width="400"
              height="400"
              className="rounded-xl mt-6 mb-2"
              controls
            >
              <source
                src={publication.metadata?.asset?.video?.uri}
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          )} */}
        </div>
      ))}
    </ul>
  )
}
