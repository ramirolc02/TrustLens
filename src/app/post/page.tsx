"use client"
import { RequireConnectedWallet } from "@/components/auth/RequireWallet"
import { UseCreatePost } from "@/components/hooks/CreatePost"

export default function CreatePost() {
  return (
    <main className="flex min-h-screen flex-col p-8 lg:p-16">
      <RequireConnectedWallet>
        <h1 className="mb-3 text-3xl font-semibold">Create Publications</h1>
        <UseCreatePost />
      </RequireConnectedWallet>
    </main>
  )
}
