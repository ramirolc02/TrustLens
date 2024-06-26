import Navbar from "@/components/navbar/Navbar"
import { Web3Provider } from "@/components/providers/Web3Provider"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Toaster } from "react-hot-toast"
import "./globals.css"
const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "TrustLens",
  description: "Social media on the blockchain",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <Web3Provider>
          <Navbar />
          <Toaster position="bottom-center" />
          {children}
        </Web3Provider>
      </body>
    </html>
  )
}
