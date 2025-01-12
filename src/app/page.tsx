"use client";

import { useEffect, useState } from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import InitiateTransactionButton from '../components/InitiateTransactionButton';
import SolflarePopup from "@/components/solflare"; 
import Address from "@/components/publickey";

const Home = () => {
  const { connection } = useConnection();
  const { publicKey, wallet} = useWallet();
  const [balance, setBalance] = useState<number>(0);
  // Open the popup and send the public key and balance
  const openPopup = async () => {
    if (!wallet) {
      console.log("No wallet connected!");
      return;
    }
    const walletName = wallet.adapter.name.toLowerCase();
    console.log(walletName);
    const popupWidth = 500;
    const popupHeight = 600;
    const left = window.screenX + (window.innerWidth - popupWidth) / 2;
    const top = window.screenY + (window.innerHeight - popupHeight) / 2;

    const popup = window.open(
      "/popup", // Path to the popup page
      "SolflarePopup", // Window name
      `width=${popupWidth},height=${popupHeight},top=${top},left=${left},resizable,scrollbars=no,toolbar=no,menubar=no,location=no,status=no`
    );

    if (popup) {
      popup.onload = async () => {
        if (publicKey) {
          // Fetch the balance
          const balance = await connection.getBalance(publicKey);
          // Send the public key and balance to the popup
          popup.postMessage({ publicKey: publicKey.toString(), balance }, window.location.origin);
        }
      };
    }
  };

  return (
    <main className="">
      <div className="border hover:border-slate-900 rounded">
        <WalletMultiButton style={{}} />
      </div>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Solana Rewards</h1>
        <InitiateTransactionButton />
      </div>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Solana Rewards</h1>
        <SolflarePopup />
      </div>
      <button
        onClick={openPopup}
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Open Solflare Popup
      </button>
      <div>
        <Address />
      </div>
    </main>
  );
};

export default Home;
