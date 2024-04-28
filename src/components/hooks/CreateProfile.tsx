import { useCreateProfile, useValidateHandle } from "@lens-protocol/react-web"
import { useState } from "react"

type CreateProfileFormProps = {
  wallet: string
}

export function CreateProfileForm({ wallet }: CreateProfileFormProps) {
  const [localName, setLocalName] = useState("")
  const { execute: validateHandle, loading: verifying } = useValidateHandle()
  const { execute: createProfile, loading: creating } = useCreateProfile()

  const submit = async () => {
    const result = await validateHandle({ localName })

    if (result.isFailure()) {
      window.alert((result.error as Error).message)
      return
    }

    const res = await createProfile({ localName, to: wallet })

    if (res.isFailure()) {
      window.alert((res.error as Error).message)
      return
    }

    const profile = res.value
    if (profile.handle) {
      window.alert(
        `Congratulations! You now own: ${profile.handle.fullHandle}!`
      )
    }
  }

  return (
    <form onSubmit={submit}>
      <input
        type="text"
        disabled={verifying || creating}
        value={localName}
        onChange={(e) => setLocalName(e.target.value)}
        style={{ color: "black" }} // Add this line to set the text color to black
      />

      <button type="submit" disabled={verifying || creating}>
        Create
      </button>
    </form>
  )
}
