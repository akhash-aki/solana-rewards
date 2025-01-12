"use client";

import { useEffect, useState } from "react";
import SeedphraseBox from "@/components/popup/seedphrase";

const PopupPage = () => {
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [balance, setBalance] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin === window.location.origin && event.data.publicKey) {
        setPublicKey(event.data.publicKey);
        setBalance(event.data.balance);
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  const truncatePublicKey = (key: string) => {
    if (!key) return "";
    return `${key.slice(0, 4)}...${key.slice(-4)}`;
  };

  const handleCopy = () => {
    if (publicKey) {
      navigator.clipboard.writeText(publicKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleTextCopy = () => {
    if (publicKey) {
      navigator.clipboard.writeText(publicKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };
  
  
  return (
    <div style={{ backgroundColor: "#13161f" }} className="h-screen w-full bg-gray-900 text-white flex flex-col items-center pt-5">
      {publicKey && balance !== null ? (
        <div className="relative group">
          {/* Combined "Connected Wallet" and Public Key Section with unified bubble background */}
          <div
            className="flex flex-col items-center gap-0 transition-all duration-300 group-hover:bg-gray-900 px-4 pt-1 pb-0  rounded-md  group-hover:space-y-0"
            onClick={handleTextCopy}
          >
            {/* "Connected Wallet" Text with upward motion */}
            <p className="text-base font-medium transition-transform duration-300 group-hover:-translate-y-1 group-hover:text-white mb-0">
              Connected Wallet
            </p>

            {/* Public Key with fade-in on hover */}
            <div className=" flex items-center gap-2 opacity-0 transition-opacity duration-300 group-hover:-translate-y-2 group-hover:opacity-100 font-extralight text-sm text-gray-400">
              <p className="font-mono mb-0">{truncatePublicKey(publicKey)}</p>

              {/* Two Papers Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-3">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
              </svg>
            </div>
          </div>

          {/* Copied Message */}
          <span
            className={`absolute top-full left-1/2 transform -translate-x-1/2  rounded-md text-xs text-white ${copied ? "block" : "hidden"} group-hover:block`}
          >
            {copied ? "Copied!" : ""}
          </span>
        </div>
      ) : (
        <p className="text-lg">Waiting for wallet data...</p>
      )}
    <SeedphraseBox/>
    </div>

  );
};

export default PopupPage;
