import { LikeReaction } from "@/components/hooks/LikeReaction"
import {
  ExplorePublicationType,
  ExplorePublicationsOrderByType,
  useExplorePublications,
} from "@lens-protocol/react"
import {
  PublicationType,
  isPostPublication,
  profileId,
  usePublications,
} from "@lens-protocol/react-web"
import { MessageSquare } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "../lib/Button"
import { CollectPublication } from "./CollectPublication"
import { CreateMirror } from "./MirrorPublication"

export default function ExplorePublications({
  type,
}: {
  type: ExplorePublicationsOrderByType
}) {
  const { data, error, loading } = useExplorePublications({
    where: {
      publicationTypes: [ExplorePublicationType.Post],
    },
    orderBy: type,
  })
  const router = useRouter()

  if (loading)
    return (
      <div>
        <p>Loading Publications of type: {type}...</p>
      </div>
    )

  if (error) return <p>Error: {error.message}</p>

  const selected = data.filter(isPostPublication)

  return (
    <div className="p-5">
      <ul>
        {selected.map((publication: any, index: number) => (
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
            <div className="flex">
              <Button
                className="rounded-full mr-1"
                onClick={() => router.push(`/publications/${publication.id}`)}
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                {publication.stats.comments}
              </Button>

              <CreateMirror
                publicationId={publication.id}
                publication={publication}
              />
              <LikeReaction publication={publication} />
              <CollectPublication publication={publication} />
            </div>
          </div>
        ))}
      </ul>
    </div>
  )
}

export function PublicationsFrom({ profileid }: { profileid: string }) {
  const { data, error, loading } = usePublications({
    where: {
      publicationTypes: [PublicationType.Post],
      from: [profileId(profileid)],
    },
  })

  const router = useRouter()

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
          <div className="flex">
            <Button
              className="rounded-full mr-1"
              onClick={() => router.push(`/publications/${publication.id}`)}
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              {publication.stats.comments}
            </Button>
            <CreateMirror
              publicationId={publication.id}
              publication={publication}
            />
            <LikeReaction publication={publication} />
            <CollectPublication publication={publication} />
          </div>
        </div>
      ))}
    </ul>
  )
}
