import {
  OpenActionKind,
  PrimaryPublication,
  TriStateValue,
  useOpenAction,
} from "@lens-protocol/react-web"
import { Grab } from "lucide-react"
import toast from "react-hot-toast"
import { Button } from "../lib/Button"

export function CollectPublication({
  publication,
}: {
  publication: PrimaryPublication
}) {
  const { execute, error, loading } = useOpenAction({
    action: {
      kind: OpenActionKind.COLLECT,
    },
  })

  const collect = async (event: React.MouseEvent) => {
    event.preventDefault()

    const result = await execute({ publication })

    console.log(publication.operations.canCollect)

    if (result.isFailure()) {
      toast.error(result.error.message)
      return
    }

    const completion = await result.value.waitForCompletion()

    if (completion.isFailure()) {
      toast.error(completion.error.message)
      return
    }

    toast.success(`Collected: ${publication.id}`)

    console.log("Open action executed successfully")
  }

  return (
    <>
      <div>
        <Button
          onClick={(event) => collect(event)}
          disabled={
            loading || publication.operations.canCollect === TriStateValue.No
          }
          className="rounded-full mr-1"
        >
          <Grab className="mr-2 h-4 w-4" />
          {publication?.stats?.collects}
        </Button>
      </div>
    </>
  )
}
