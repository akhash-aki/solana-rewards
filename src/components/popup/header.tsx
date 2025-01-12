"use client";

import { useEffect, useState } from "react";

const Header = () => {
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [balance, setBalance] = useState<number | null>(null);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Ensure that the message is from the same origin
      if (event.origin === window.location.origin && event.data.publicKey) {
        setPublicKey(event.data.publicKey);
        setBalance(event.data.balance); // Balance received in lamports
      }
    };

    window.addEventListener("message", handleMessage);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return (
    <div className="h-screen w-full bg-gray-900 text-white flex flex-col">
      {publicKey && balance !== null ? (
        <div>
          <h1>Your wallet public key is: {publicKey}</h1>
          <h2>Your balance is: {balance / 1000000000} SOL</h2>
        </div>
      ) : (
        <h1>Waiting for wallet data...</h1>
      )}
    </div>
  );
};

export default Header;
