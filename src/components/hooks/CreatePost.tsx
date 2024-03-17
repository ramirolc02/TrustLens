import { textOnly } from "@lens-protocol/metadata"
import { useCreatePost } from "@lens-protocol/react-web"
import { toast } from "react-hot-toast"
import { Button } from "../lib/Button"
import { useIrysUploader } from "./UploadMetadata"

function CreatePost() {
  const { uploadMetadata } = useIrysUploader()
  const { execute, error, loading } = useCreatePost()

  const post = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    // create the desired metadata via the `@lens-protocol/metadata` package helpers
    const metadata = textOnly({
      content: formData.get("content") as string,
    })

    // upload the metadata to a storage provider of your choice (IPFS in this example)
    // const uri = await uploadToIpfs(metadata);

    // invoke the `execute` function to create the post
    const result = await execute({
      metadata: await uploadMetadata(metadata),
      sponsored: formData.get("sponsored") === "on",
    })

    if (result.isFailure()) {
      toast.error(result.error.message)
      return
    }

    toast.success(`Post broadcasted, waiting for completion...`)

    const completion = await result.value.waitForCompletion()

    if (completion.isFailure()) {
      toast.error(completion.error.message)
      return
    }
    // post was created
    const post = completion.value
    toast.success(`Post ID: ${post.id}`)
  }

  return (
    <form onSubmit={post}>
      <fieldset>
        <textarea
          name="content"
          minLength={1}
          required
          rows={3}
          placeholder="What's happening?"
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
          Post
        </Button>

        {!loading && error && <pre>{error.message}</pre>}
      </fieldset>
    </form>
  )
}

export function UseCreatePost() {
  return (
    <div>
      <h1>
        <code>Create a Post </code>
      </h1>
      <CreatePost />
    </div>
  )
}
