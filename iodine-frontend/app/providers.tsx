"use client"

import React from 'react'
import "dotenv/config"
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
  lightTheme,
  midnightTheme,
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {
    mainnet,
  gnosis,
  gnosisChiado
} from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { publicProvider } from 'wagmi/providers/public';

const { chains, publicClient } = configureChains(
    [mainnet, gnosis, gnosisChiado],
    [
      // alchemyProvider({ apiKey: process.env.ALCHEMY_ID }),
      jsonRpcProvider({ rpc: () => ({ http: "https://rpc.ankr.com/gnosis" }) }),
      publicProvider(),
    ]
  );
  const { connectors } = getDefaultWallets({
    appName: 'Iodine',
    projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID || "",
    chains
  });
  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient
  })
  const appInfo = {
    appName: "Iodine"
  }

function Providers({
    children,
  }: {
    children: React.ReactNode
  }) {
  return (
    <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains} appInfo={appInfo} theme={lightTheme({
            accentColor: 'rgb(147 51 234)',
            borderRadius: 'medium',
        })}>
            {children}
        </RainbowKitProvider>
    </WagmiConfig>
  )
}

export default Providers