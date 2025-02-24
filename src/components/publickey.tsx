"use client";
import { useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";
 
export default function Address() {
  const { publicKey } = useWallet();
  const [balance] = useState<number>(0);
 
  // code for the `getAirdropOnClick` function here
 
  // code for the `getBalanceEvery10Seconds` and useEffect code here
 
  const getAirdropOnClick = () => {
    // Handle form submission logic here
    console.log('Submitted text:', publicKey);
    console.log("balance:", balance)
   
};
  return (
    <main className="flex min-h-screen flex-col items-center justify-evenly p-24">
      {publicKey ? (
        <div className="flex flex-col gap-4">
          <h1>Your Public key is: {publicKey?.toString()}</h1>
          <h2>Your Balance is: {balance} SOL</h2>
          <div>
            <button
              onClick={getAirdropOnClick}
              type="button"
              className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            >
              Get Airdrop
            </button>
          </div>
        </div>
      ) : (
        <h1>Wallet is not connected</h1>
      )}
    </main>
  );
}