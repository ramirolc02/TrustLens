"use client"

import { LensLogin } from "@/components/auth/LensLogin"
import { usePrivy } from "@privy-io/react-auth"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const router = useRouter()
  const {
    ready,
    authenticated,
    user,
    logout,
    linkEmail,
    linkWallet,
    unlinkEmail,
    linkPhone,
    unlinkPhone,
    unlinkWallet,
    linkGoogle,
    unlinkGoogle,
    linkTwitter,
    unlinkTwitter,
    linkDiscord,
    unlinkDiscord,
  } = usePrivy()

  //   useEffect(() => {
  //     if (ready && !authenticated) {
  //       router.push("/")
  //     }
  //   }, [ready, authenticated, router])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8 lg:p-16">
      <div className="flex place-items-center flex-col max-w-lg my-16">
        <h1 className="mb-3 text-3xl font-semibold">Welcome to Lens</h1>

        <LensLogin />
        {/*<div style={{ height: "20px" }}></div>
        <DisplayPublications /> */}
      </div>
    </main>
  )
}
