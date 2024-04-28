import { usePrivy } from "@privy-io/react-auth"
import { useAccount, useDisconnect } from "wagmi"
import { ButtonAlt } from "./Button"

export function DisconnectWalletButton() {
  const { isConnected } = useAccount()
  const { disconnect } = useDisconnect()
  const { ready, authenticated, logout } = usePrivy()

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    logout()
  }

  if (ready && !authenticated) {
    return null
  }

  return <ButtonAlt onClick={handleClick}>Disconnect</ButtonAlt>
}
