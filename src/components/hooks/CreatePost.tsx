import { MediaImageMimeType, image, textOnly } from "@lens-protocol/metadata"
import { OpenActionType, useCreatePost } from "@lens-protocol/react-web"
import { useState } from "react"
import { toast } from "react-hot-toast"
import { Button } from "../lib/Button"
import { useIrysImageUploader, useIrysUploader } from "./UploadMetadata"

function never(message: string): never {
  throw new Error(message)
}

function CreatePost() {
  const { uploadMetadata } = useIrysUploader()
  const { uploadImage } = useIrysImageUploader()
  const { execute, error, loading } = useCreatePost()
  const [file, setFile] = useState<any>()
  const [content, setContent] = useState<string>("")

  async function handleFileChange(e: any) {
    e.preventDefault()
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  const post = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)

    // create the desired metadata via the `@lens-protocol/metadata` package helpers
    const metadata = textOnly({
      content: formData.get("content") as string,
    })

    // invoke the `execute` function to create the post
    const result = await execute({
      metadata: await uploadMetadata(metadata),
      sponsored: formData.get("sponsored") === "on",
      actions: [
        {
          type: OpenActionType.SIMPLE_COLLECT,
          followerOnly: true,
          collectLimit: 5,
        },
      ],
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
    setContent("")
    const post = completion.value
    toast.success(`Post ID: ${post.id}`)
  }

  const postImage = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)
    const file = formData.get("file") as File

    console.log(file)

    // create the desired metadata via the `@lens-protocol/metadata` package helpers
    const metadataImage = image({
      image: {
        item: await uploadImage(file),
        type: MediaImageMimeType.PNG,
      },
    })

    // invoke the `execute` function to create the post
    const result = await execute({
      metadata: await uploadMetadata(metadataImage),
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
    setFile(undefined)
    const post = completion.value
    toast.success(`Post ID: ${post.id}`)
  }

  return (
    <main>
      <h1>Create Post</h1>
      <form onSubmit={post}>
        <fieldset>
          <textarea
            name="content"
            minLength={1}
            required
            rows={3}
            placeholder="Texto..."
            style={{ resize: "none", color: "black" }}
            disabled={loading}
            value={content}
            onChange={(e) => setContent(e.target.value)}
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
      <h1>Create Image Post</h1>
      <form onSubmit={postImage}>
        <fieldset>
          <input
            type="file"
            name="file"
            accept="image/png"
            onChange={handleFileChange}
            disabled={loading}
          />
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
            Post Image
          </Button>

          {!loading && error && <pre>{error.message}</pre>}
        </fieldset>
      </form>
    </main>
  )
}

export function UseCreatePost() {
  return (
    <div>
      <CreatePost />
    </div>
  )
}
