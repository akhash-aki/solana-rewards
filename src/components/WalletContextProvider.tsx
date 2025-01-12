'use client';

import React, { ReactNode, useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import '@solana/wallet-adapter-react-ui/styles.css';
import useWalletStore from '@/components/walletstore'

export default function WalletContextProvider({
    children,
  }: {
    children: React.ReactNode;
  }) {
    const network = WalletAdapterNetwork.Devnet;
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);
    const wallets = useMemo(
      () => [
        // manually add any legacy wallet adapters here
        // new UnsafeBurnerWalletAdapter(),
      ],
      [network],
    );
    const setWalletPublicKey = useWalletStore((state) => state.setWalletPublicKey);
    return (
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletModalProvider>{children}</WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    );
  }
