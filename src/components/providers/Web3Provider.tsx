"use client"

import { LensConfig, LensProvider, development } from "@lens-protocol/react-web"
import { bindings } from "@lens-protocol/wagmi"
import { PrivyClientConfig, PrivyProvider } from "@privy-io/react-auth"
import { WagmiProvider, createConfig } from "@privy-io/wagmi"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import React from "react"
import { http } from "wagmi"
import { polygon, polygonAmoy } from "wagmi/chains"

// connect kit doesn't export the config type, so we create it here
// type ConnectKitConfig = Parameters<typeof getDefaultConfig>[0]

// differences in config between the environments
// const appConfigs = {
//   development: {
//     connectkit: {
//       chains: [polygonAmoy],
//       transports: {
//         [polygonAmoy.id]: http(),
//       },
//     } as Partial<ConnectKitConfig>,
//     lens: {
//       environment: development,
//       debug: true,
//     } as Partial<LensConfig>,
//   },
//   production: {
//     connectkit: {
//       chains: [polygon],
//       transports: {
//         [polygon.id]: http(),
//       },
//     } as Partial<ConnectKitConfig>,
//     lens: {
//       environment: production,
//     } as Partial<LensConfig>,
//   },
// }

// select the config based on the environment
// const appConfig = appConfigs["development"] // or appConfigs["production"]

const wagmiConfig = createConfig({
  chains: [polygon, polygonAmoy],
  transports: {
    [polygon.id]: http(),
    [polygonAmoy.id]: http(),
  },
})

const queryClient = new QueryClient()

const lensConfig: LensConfig = {
  environment: development, // or production for polygon mainnet
  bindings: bindings(wagmiConfig),
}

const privyConfig: PrivyClientConfig = {
  embeddedWallets: {
    createOnLogin: "users-without-wallets",
    requireUserPasswordOnCreate: true,
    noPromptOnSignature: false,
  },
  loginMethods: ["wallet", "email", "sms"],
  defaultChain: polygonAmoy,
  supportedChains: [polygon, polygonAmoy],
  appearance: {
    showWalletLoginFirst: true,
  },
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || ""}
      config={privyConfig}
    >
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={wagmiConfig}>
          <LensProvider config={lensConfig}>{children}</LensProvider>
        </WagmiProvider>
      </QueryClientProvider>
    </PrivyProvider>
  )
}
