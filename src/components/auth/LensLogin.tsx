import {
  SessionType,
  useSession as useLensSession,
} from "@lens-protocol/react-web"
import { useAccount as useWagmiAccount } from "wagmi"

import { truncateEthAddress } from "@/utils/truncateEthAddress"
import { ConnectWalletButton } from "../lib/ConnectWalletButton"
import { DisconnectWalletButton } from "../lib/DisconnectWalletButton"
import { LoginForm } from "../lib/LoginForm"
import { LogoutButton } from "../lib/LogoutButton"

export function LensLogin() {
  const { isConnected, address } = useWagmiAccount()
  const { data: session } = useLensSession()

  // step 1. connect wallet
  if (!isConnected) {
    return (
      <>
        <p className="mb-4 text-gray-500">
          Connect your wallet to get started.
        </p>
        <ConnectWalletButton />
      </>
    )
  }

  // step 2. connect Lens Profile
  if (!session?.authenticated && address) {
    return (
      <div>
        <p className="mb-4 text-gray-500">
          Connected wallet: {truncateEthAddress(address)}
        </p>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <LoginForm owner={address} />
          <div style={{ height: "5px" }}></div>
          <DisconnectWalletButton />
        </div>
      </div>
    )
  }

  // step 3. show Profile details
  if (session && session.type === SessionType.WithProfile) {
    return (
      <>
        <p className="mb-4 text-gray-200 text-lg">
          You are logged in as{" "}
          <span className="text-gray-500 font-semibold">
            {session.profile.handle?.fullHandle ?? session.profile.id}
          </span>
          .
        </p>
        <LogoutButton />
      </>
    )
  }

  // you can handle other session types here
  return null
}
