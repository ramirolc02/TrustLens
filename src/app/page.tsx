"use client"

import { LensLogin } from "@/components/auth/LensLogin"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8 lg:p-16">
      <div className="flex place-items-center flex-col max-w-lg my-16">
        <h1 className="mb-3 text-3xl font-semibold">
          Welcome to <span className="text-green-500">TrustLens</span>
        </h1>
        <LensLogin />
      </div>
    </main>
  )
}
