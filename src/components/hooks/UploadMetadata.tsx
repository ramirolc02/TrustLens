import { Web3Provider } from "@ethersproject/providers"
import { WebIrys } from "@irys/sdk"
import { Account, Chain, Client, Transport } from "viem"
import { useConnectorClient } from "wagmi"

function never(message: string): never {
  throw new Error(message)
}
// const TOP_UP = "200000000000000000" // 0.2 MATIC
const MIN_FUNDS = 0.2

export async function getWebIrys(client: Client<Transport, Chain, Account>) {
  const webIrys = new WebIrys({
    url: "https://devnet.irys.xyz",
    token: "matic",
    wallet: {
      rpcUrl: "https://rpc-amoy.polygon.technology/",
      name: "ethersv5",
      provider: new Web3Provider(client.transport),
    },
  })

  await webIrys.ready()

  const balance = await webIrys.getBalance(client.account.address)

  if (webIrys.utils.fromAtomic(balance).toNumber() < MIN_FUNDS) {
    // Fund the account with Amoy Matic
    await webIrys.fund(webIrys.utils.toAtomic(0.2))
  }

  return webIrys
}

export function useIrysUploader() {
  const { data: client } = useConnectorClient()

  return {
    uploadMetadata: async (data: unknown) => {
      const confirm = window.confirm(`Almacenar metadatos en Arweave?`)

      if (!confirm) {
        throw new Error("User cancelled")
      }

      const irys = await getWebIrys(client ?? never("viem Client not found"))

      const serialized = JSON.stringify(data)
      const tx = await irys.upload(serialized, {
        tags: [{ name: "Content-Type", value: "application/json" }],
      })
      console.log(`https://arweave.net/${tx.id}`)
      return `https://arweave.net/${tx.id}`
    },
  }
}

export function useIrysImageUploader() {
  const { data: client } = useConnectorClient()

  return {
    uploadImage: async (data: File) => {
      const confirm = window.confirm(`Almacenar imagen en Arweave? `)

      if (!confirm) {
        throw new Error("User cancelled")
      }

      const irys = await getWebIrys(client ?? never("viem Client not found"))

      const tx = await irys.uploadFile(data)
      console.log(`https://arweave.net/${tx.id}`)

      return `https://arweave.net/${tx.id}`
    },
  }
}
