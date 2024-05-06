import { useCreateProfile } from "@lens-protocol/react-web"

import toast from "react-hot-toast"

export function CreateProfileForm({ address }: { address: string }) {
  const { execute, loading } = useCreateProfile()

  const createProfile = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)

    const localName = formData.get("localName") as string

    const result = await execute({ localName, to: address })

    if (result.isFailure()) {
      toast.error(result.error.message)
      return
    }

    const profile = result.value
    return
  }

  return (
    <form onSubmit={createProfile}>
      <fieldset>
        <legend>Choose a handle for your profile</legend>
        <label>
          <div>
            lens/&nbsp;
            <input
              type="text"
              name="localName"
              placeholder="your-handle"
              disabled={loading}
              style={{ color: "black" }}
            />
          </div>
        </label>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          <button disabled={loading}>Submit</button>
        </div>
      </fieldset>
    </form>
  )
}
