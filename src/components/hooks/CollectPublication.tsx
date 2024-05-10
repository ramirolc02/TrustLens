import {
  OpenActionKind,
  PrimaryPublication,
  useOpenAction,
} from "@lens-protocol/react-web"
import { Grab } from "lucide-react"
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

  const collect = async (
    event: React.MouseEvent,
    publication: PrimaryPublication
  ) => {
    event.preventDefault()

    const result = await execute({ publication })

    if (result.isFailure()) {
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

        case "InsufficientAllowanceError":
          const requestedAmount = result.error.requestedAmount
          console.log(
            "You must approve the contract to spend at least: " +
              `${
                requestedAmount.asset.symbol
              } ${requestedAmount.toSignificantDigits(6)}`
          )
          break

        case "InsufficientFundsError":
          const requestedAmount1 = result.error.requestedAmount
          console.log(
            "You do not have enough funds to pay for this collect fee: " +
              `${
                requestedAmount1.asset.symbol
              } ${requestedAmount1.toSignificantDigits(6)}`
          )
          break

        case "WalletConnectionError":
          console.log(
            "There was an error connecting to your wallet",
            error?.message
          )
          break

        case "UserRejectedError":
          // the user decided to not sign, usually this is silently ignored by UIs
          break
      }
      return
    }

    const completion = await result.value.waitForCompletion()

    if (completion.isFailure()) {
      console.log(
        "There was an processing the transaction",
        completion.error.message
      )
      return
    }

    console.log("Open action executed successfully")
  }

  return (
    <div>
      <Button
        onClick={(event) => collect(event, publication)}
        disabled={loading}
        className="rounded-full mr-1"
      >
        <Grab className="mr-2 h-4 w-4" />
        {publication?.stats?.collects}
      </Button>
    </div>
  )
}
