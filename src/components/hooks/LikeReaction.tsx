import {
  PrimaryPublication,
  PublicationReactionType,
  useReactionToggle,
} from "@lens-protocol/react-web"
import { Heart } from "lucide-react"
import { Button } from "../lib/Button"

export function LikeReaction({
  publication,
}: {
  publication: PrimaryPublication
}) {
  const { execute: toggle, loading, error } = useReactionToggle()

  const toggleReaction = async () => {
    await toggle({
      reaction: PublicationReactionType.Upvote,
      publication,
    })
  }

  if (error) {
    return <p>Error reacting to publication: {error}</p>
  }

  return (
    <div>
      <Button
        onClick={toggleReaction}
        disabled={loading}
        className="rounded-full mr-1"
      >
        <Heart className="mr-2 h-4 w-4" />
        {publication.stats.upvotes}
      </Button>
    </div>
  )
}
