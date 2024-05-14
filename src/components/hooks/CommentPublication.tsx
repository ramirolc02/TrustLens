import { textOnly } from "@lens-protocol/metadata"
import { PublicationId, useCreateComment } from "@lens-protocol/react-web"
import { RequireConnectedWallet } from "../auth/RequireWallet"
import { Button } from "../lib/Button"
import { useIrysUploader } from "./UploadMetadata"

function CreateComment({ publicationId }: { publicationId: PublicationId }) {
  const { execute, error, loading } = useCreateComment()
  const { uploadMetadata } = useIrysUploader()

  const comment = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)

    const metadata = textOnly({
      content: formData.get("content") as string,
    })
    // invoke the `execute` function to create the comment
    const result = await execute({
      metadata: await uploadMetadata(metadata),
      commentOn: publicationId,
    })

    if (result.isFailure()) {
      switch (result.error.name) {
        case "BroadcastingError":
          console.log(
            "There was an error broadcasting the transaction",
            error?.message ?? "Unknown error"
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
            error?.message ?? "Unknown error"
          )
          break

        case "UserRejectedError":
          console.log("User rejected the transaction")
          break
      }
    }
  }
  return (
    <main>
      <RequireConnectedWallet>
        <form onSubmit={comment}>
          <fieldset>
            <textarea
              name="content"
              minLength={1}
              required
              rows={3}
              placeholder="Leave a comment..."
              style={{ resize: "none", color: "black" }}
              disabled={loading}
            ></textarea>

            <label>
              <input
                type="checkbox"
                name="sponsored"
                disabled={loading}
                value="on"
                defaultChecked={true}
              />
              sponsored
            </label>

            <Button type="submit" disabled={loading}>
              Post comment
            </Button>

            {!loading && error && <pre>{error.message}</pre>}
          </fieldset>
        </form>
      </RequireConnectedWallet>
    </main>
  )
}

export function UseCreateComment({
  publicationId,
}: {
  publicationId: PublicationId
}) {
  return (
    <div>
      <CreateComment publicationId={publicationId} />
    </div>
  )
}
