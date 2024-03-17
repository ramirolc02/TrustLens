"use client"
import { RequireConnectedWallet } from "@/components/auth/RequireWallet"
import { UseCreatePost } from "@/components/hooks/CreatePost"

export default function CreatePost() {
  return (
    <div className="flex justify-center items-center h-screen">
      <RequireConnectedWallet>
        <UseCreatePost />
      </RequireConnectedWallet>
    </div>
  )
}
