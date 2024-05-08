import {
  BroadcastingError,
  InsufficientAllowanceError,
  InsufficientFundsError,
  InsufficientGasError,
  PendingSigningRequestError,
  PrematureFollowError,
  Profile,
  TransactionError,
  TriStateValue,
  UserRejectedError,
  WalletConnectionError,
  useFollow,
  useUnfollow,
} from "@lens-protocol/react-web"
import toast from "react-hot-toast"
import { Button } from "../lib/Button"

function handleFollowError(
  error:
    | BroadcastingError
    | InsufficientAllowanceError
    | InsufficientFundsError
    | InsufficientGasError
    | PendingSigningRequestError
    | PrematureFollowError
    | UserRejectedError
    | TransactionError
    | WalletConnectionError
) {
  switch (error.name) {
    case "InsufficientAllowanceError":
      toast.error(
        "You must approve the contract to spend at least: " +
          `${
            error.requestedAmount.asset.symbol
          } ${error.requestedAmount.toSignificantDigits(6)}`
      )
      break

    case "InsufficientFundsError":
      toast.error(
        "You do not have enough funds to pay for this follow fee: " +
          `${
            error.requestedAmount.asset.symbol
          } ${error.requestedAmount.toSignificantDigits(6)}`
      )
      break

    case "InsufficientGasError":
      toast.error("You do not have enough funds to pay for this tx gas.")
      break

    case "UserRejectedError":
      // do nothing
      break
    default:
      toast.error(error.message)
  }
}

export default function FollowButton({ profile }: { profile: Profile }) {
  const {
    execute: executeFollow,
    error: followError,
    loading: isFollowLoading,
  } = useFollow()

  const {
    execute: executeUnfollow,
    error: unfollowError,
    loading: isUnfollowLoading,
  } = useUnfollow()

  const paidFollow = async () => {
    const result = await executeFollow({ profile, sponsored: false })

    if (result.isFailure()) {
      return handleFollowError(result.error)
    }

    const completion = await result.value.waitForCompletion()

    if (completion.isFailure()) {
      return handleFollowError(completion.error)
    }
    toast.success("Followed successfully")
  }

  const unfollow = async () => {
    const result = await executeUnfollow({ profile })

    if (result.isFailure()) {
      return handleFollowError(result.error)
    }

    const completion = await result.value.waitForCompletion()

    if (completion.isFailure()) {
      return handleFollowError(completion.error)
    }
    toast.success("Unfollowed successfully")
  }

  if (profile.operations.isFollowedByMe.value) {
    return (
      <>
        <Button
          onClick={unfollow}
          disabled={isUnfollowLoading || !profile.operations.canUnfollow}
          title={
            profile.operations.canUnfollow
              ? "Click to unfollow"
              : "Follow request not finalized yet"
          }
        >
          Unfollow
        </Button>
        &nbsp;
        {unfollowError && <p>{unfollowError.message}</p>}
      </>
    )
  }

  return (
    <>
      <Button
        onClick={paidFollow}
        disabled={
          isFollowLoading || profile.operations.canFollow !== TriStateValue.Yes
        }
        title={
          profile.operations.canFollow === TriStateValue.Yes
            ? "Seguir usuario"
            : "Unfollow en proceso"
        }
      >
        Seguir Perfil
      </Button>
      &nbsp;
      {followError && <p>{followError.message}</p>}
    </>
  )
}
