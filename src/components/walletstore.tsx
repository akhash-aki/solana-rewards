// src/store/walletStore.ts
import { create } from 'zustand';
import { PublicKey } from '@solana/web3.js';

interface WalletState {
  walletPublicKey: PublicKey | null;
  setWalletPublicKey: (key: PublicKey | null) => void;
}

const useWalletStore = create<WalletState>((set) => ({
  walletPublicKey: null,
  setWalletPublicKey: (key) => set({ walletPublicKey: key }),
}));

export default useWalletStore;
