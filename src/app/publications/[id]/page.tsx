"use client"
import { UseCreateComment } from "@/components/hooks/CommentPublication"
import { CommentsOnPublication } from "@/components/hooks/DisplayPublicationComments"
import { MetadataSwitch } from "@/components/lib/MetadataSwitch"
import { formatProfileIdentifier } from "@/utils/formatprofileIdentifiers"
import { PublicationId, usePublication } from "@lens-protocol/react-web"

export default function Publication({
  params,
}: {
  params: { id: PublicationId }
}) {
  const pubId = params.id
  console.log(pubId)

  const { data: publication, loading } = usePublication({
    forId: pubId,
  })

  if (loading) return <div>loading...</div>

  return (
    <main className="px-10 py-14">
      <div>
        <h1 className="mb-3 text-3xl font-semibold">Publication:</h1>
      </div>
      {publication?.__typename === "Post" && (
        <div className="py-4 bg-zinc-900 rounded mb-3 px-4">
          <MetadataSwitch metadata={publication.metadata} />
          <p> by: {formatProfileIdentifier(publication.by)}</p>
        </div>
      )}

      <UseCreateComment publicationId={pubId} />

      <div>
        <h1 className="mb-3 text-3xl font-semibold">Comments:</h1>
      </div>

      {publication ? (
        <CommentsOnPublication publication={publication} />
      ) : (
        <div>loading...</div>
      )}
    </main>
  )
}
