"use client"

import { useAccount, useDisconnect } from "wagmi"

import { truncateEthAddress } from "@/utils/truncateEthAddress"
import { usePrivy, useWallets } from "@privy-io/react-auth"
import { useSetActiveWallet } from "@privy-io/wagmi"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()
  const {
    ready,
    user,
    authenticated,
    login,
    connectWallet,
    logout,
    linkWallet,
  } = usePrivy()

  const { wallets, ready: walletsReady } = useWallets()

  // WAGMI hooks
  const { address, isConnected, isConnecting, isDisconnected } = useAccount()
  const { disconnect } = useDisconnect()
  const { setActiveWallet } = useSetActiveWallet()

  const MonoLabel = ({ label }: { label: string }) => {
    return (
      <span className="rounded-xl bg-slate-200 px-2 py-1 font-mono">
        {label}
      </span>
    )
  }

  const handleLogin = () => {
    if (ready && authenticated && isConnected) {
      router.push("/dashboard") // Redirect to dashboard if user is already logged in
    } else {
      login()
      // router.push("/dashboard")
    }
  }

  const setTheActiveWallet = async (wallet: any) => {
    await setActiveWallet(wallet)
    router.push("/dashboard")
  }

  if (!ready) {
    return null
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8 lg:p-16">
      <div className="flex place-items-center flex-col max-w-lg my-16">
        <h1 className="mb-3 text-3xl font-semibold">Welcome to Social</h1>
        <div className="mt-6 flex justify-center text-center gap-4 flex-col">
          {ready && !authenticated && (
            <div>
              <button
                className="bg-violet-600 hover:bg-violet-700 py-3 px-6 text-white rounded-lg"
                onClick={login}
              >
                Log in
              </button>
            </div>
          )}
          {ready && authenticated && (
            <button
              className="bg-red-600 hover:bg-red-700 py-3 px-6 text-white rounded-lg"
              onClick={logout}
            >
              Log out
            </button>
          )}
          {walletsReady &&
            wallets.map((wallet) => {
              return (
                <div
                  key={wallet.address}
                  className="flex flex-row items-center gap-2 bg-slate-50 p-4 rounded-lg"
                >
                  <MonoLabel label={truncateEthAddress(wallet.address)} />
                  <button
                    className="bg-blue-600 hover:bg-blue-700 py-3 px-6 text-white rounded-lg"
                    onClick={() => {
                      setTheActiveWallet(wallet)
                    }}
                  >
                    Make active
                  </button>
                </div>
              )
            })}
          <div className="flex flex-col items-start gap-2 rounded border border-black bg-violet-600 p-3">
            <h1 className="text-4xl font-bold">WAGMI</h1>
            <p>
              Connection status:
              {isConnecting && <span>🟡 connecting...</span>}
              {isConnected && <span>🟢 connected.</span>}
              {isDisconnected && <span> 🔴 disconnected.</span>}
            </p>
            {isConnected && address && (
              <button
                className="bg-red-600 hover:bg-red-700 py-3 px-6 text-white rounded-lg"
                onClick={(event) => disconnect()}
              >
                Log out from WAGMI
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
