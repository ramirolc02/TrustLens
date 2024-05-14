import { formatProfileIdentifier } from "@/utils/formatprofileIdentifiers"
import {
  AnyPublication,
  isCommentPublication,
  usePublications,
} from "@lens-protocol/react-web"

export function CommentsOnPublication({
  publication,
}: {
  publication: AnyPublication
}) {
  const {
    data: publications,
    error,
    loading,
  } = usePublications({
    where: {
      commentOn: {
        id: publication.id,
      },
    },
  })

  if (loading) return <div>Loading...</div>

  if (error) return <div>Error: {error.message}</div>

  const comments = publications.filter(isCommentPublication)

  return (
    <div>
      {comments.map((comment, index) => (
        <section key={index}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              gap: "2rem",
            }}
          >
            <p>{formatProfileIdentifier(comment.by)}</p>
          </div>
          {comment.metadata.__typename === "TextOnlyMetadataV3" ? (
            <div className="py-4 bg-zinc-900 rounded mb-3 px-4">
              {comment.metadata.content}
            </div>
          ) : null}
        </section>
      ))}
    </div>
  )
}
