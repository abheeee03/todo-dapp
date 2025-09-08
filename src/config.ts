import { createConfig, http, injected } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'
import { metaMask, safe } from 'wagmi/connectors'

export const config = createConfig({
  chains: [mainnet, sepolia],
   connectors: [
    injected(),
    metaMask(),
    safe(),
  ],
  transports: {
    [sepolia.id]: http(import.meta.env.VITE_PUBLIC_RPC_URL),
    [mainnet.id]: http()
  },
})