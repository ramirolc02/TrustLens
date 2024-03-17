import { ReactNode } from "react"
import { useAccount, useConnect } from "wagmi"
import { injected } from "wagmi/connectors"
import { Button } from "../lib/Button"

type RenderFunction = (address: string) => ReactNode

export type RequireConnectedWalletProps = {
  children: React.ReactNode | RenderFunction
  message?: string
}

export function RequireConnectedWallet({
  children,
  message,
}: RequireConnectedWalletProps) {
  const { address, isConnected, isConnecting } = useAccount()

  const { connect } = useConnect()

  if (isConnected && address) {
    if (typeof children === "function") {
      return <>{children(address)}</>
    }
    return <>{children}</>
  }

  return (
    <div>
      {message && <p>{message}</p>}
      <Button
        disabled={isConnecting}
        onClick={() => connect({ connector: injected() })}
      >
        Connect first
      </Button>
    </div>
  )
}
