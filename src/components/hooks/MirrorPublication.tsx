import {
  PrimaryPublication,
  PublicationId,
  useCreateMirror,
} from "@lens-protocol/react-web"
import { Repeat2 } from "lucide-react"
import toast from "react-hot-toast"
import { Button } from "../lib/Button"

export function CreateMirror({
  publicationId,
  publication,
}: {
  publicationId: PublicationId
  publication: PrimaryPublication
}) {
  const { execute, error, loading } = useCreateMirror()

  const mirror = async (event: React.MouseEvent) => {
    event.preventDefault()

    const result = await execute({
      mirrorOn: publicationId,
    })

    if (result.isFailure()) {
      toast.error(result.error.message)
      switch (result.error.name) {
        case "BroadcastingError":
          console.log(
            "There was an error broadcasting the transaction",
            error?.message
          )
          break

        case "PendingSigningRequestError":
          console.log(
            "There is a pending signing request in your wallet. " +
              "Approve it or discard it and try again."
          )
          break

        case "WalletConnectionError":
          console.log(
            "There was an error connecting to your wallet",
            error?.message
          )
          break

        case "UserRejectedError":
          console.log("User rejected the transaction")
          break
        case "InsufficientGasError":
          console.log(
            "You do not have enough funds to pay for the transaction cost."
          )
          break
      }
      return
    }

    const completion = await result.value.waitForCompletion()

    if (completion.isFailure()) {
      toast.error(completion.error.message)
      console.log(
        "There was an processing the transaction",
        completion.error.message
      )
      return
    }
    const mirror = completion.value
    toast.success(`Publication mirrored: ${mirror.id}`)
  }

  return (
    <Button onClick={(event) => mirror(event)} className="rounded-full mr-1">
      <Repeat2 className="mr-2 h-4 w-4" />
      {publication.stats.mirrors}
    </Button>
  )
}
