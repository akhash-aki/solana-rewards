"use client";

import React, { useState } from "react";
import WalletPublicKeyDisplay from "@/components/walletPublicKey"
import Address from "./publickey";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";


const PopupContent: React.FC = () => {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const [balance, setBalance] = useState<number>(0);
  console.log('PopupContent rendered:', { publicKey });
  
  return (
    <div
      className="h-screen w-full bg-gray-900 text-white flex flex-col"
      style={{ fontFamily: "Arial, sans-serif" }}
    >
      {/* Header */}
      <div className="flex justify-between items-center bg-gray-800 px-4 py-2">
        <h1 className="text-lg font-bold">Connected Wallet</h1>
        <div>{publicKey ? (
        <div className="flex flex-col gap-4">
          <h1>Your Public key is: {publicKey?.toString()}</h1>
          <h2>Your Balance is: {balance} SOL</h2>
        </div>
      ) : (
        <h1>Wallet is not connected</h1>
      )}</div>
      </div>

      {/* Content */}
      <div className="flex flex-col justify-center items-center flex-grow p-4">
        <h2 className="text-xl font-semibold mb-4">Welcome to Solflare</h2>
        <div>
          <label htmlFor="textInput" className="block mb-2 text-sm">
            Enter Text:
          </label>
          <input
            id="textInput"
            type="text"
            placeholder="Type something..."
            className="px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
          />
        </div>
      </div>
    </div>
  );
};

export default PopupContent;
