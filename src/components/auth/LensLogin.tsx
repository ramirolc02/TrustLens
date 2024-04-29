import { truncateEthAddress } from "@/utils/truncateEthAddress"
import {
  SessionType,
  useSession as useLensSession,
} from "@lens-protocol/react-web"
import { useWallets } from "@privy-io/react-auth"
import { useAccount as useWagmiAccount } from "wagmi"
import DisplayFeed from "../hooks/DisplayFeed"
import { LoginForm } from "../lib/LoginForm"
import { LogoutButton } from "../lib/LogoutButton"

export function LensLogin() {
  const { isConnected, address } = useWagmiAccount()
  const { data: session } = useLensSession()
  const { wallets } = useWallets()

  // step 1. connect wallet
  if (!isConnected) {
    return (
      <>
        <p className="mb-4 text-gray-500">
          Connect your wallet to get started.
        </p>
        {/* <ConnectWalletButton /> */}
      </>
    )
  }

  // step 2. connect Lens Profile
  if (!session?.authenticated && address) {
    return (
      <>
        <p className="mb-4 text-gray-500">
          Connected wallet: {truncateEthAddress(address)}
          Address: {address}
        </p>
        <LoginForm owner={address} />
        {/* <CreateProfileForm wallet={address} /> */}
        <div className="mt-2">{/* <DisconnectWalletButton /> */}</div>
      </>
    )
  }

  // step 3. show Profile details
  if (session && session.type === SessionType.WithProfile) {
    return (
      <>
        <p className="mb-4 text-gray-500">
          You are logged in as{" "}
          <span className="text-gray-800 font-semibold">
            {session.profile.handle?.fullHandle ?? session.profile.id}
          </span>
          .
        </p>
        <LogoutButton />
        <DisplayFeed profileId={session.profile.id} />
      </>
    )
  }

  // you can handle other session types here
  return null
}
