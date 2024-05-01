import {
  ExplorePublicationType,
  ExplorePublicationsOrderByType,
  useExplorePublications,
} from "@lens-protocol/react"
import { Grab, Heart, MessageSquare, Repeat2 } from "lucide-react"
import { Button } from "../lib/Button"

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
          <div className="flex">
            <Button className="rounded-full mr-1">
              <MessageSquare className="mr-2 h-4 w-4" />
              {publication.stats.comments}
            </Button>
            <Button className="rounded-full mr-1">
              <Repeat2 className="mr-2 h-4 w-4" />
              {publication.stats.mirrors}
            </Button>
            <Button className="rounded-full mr-1">
              <Heart className="mr-2 h-4 w-4" />
              {publication.stats.upvotes}
            </Button>
            <Button className="rounded-full mr-1">
              <Grab className="mr-2 h-4 w-4" />
              {publication.stats.collects}
            </Button>
          </div>
        </div>
      ))}
    </ul>
  )
}
