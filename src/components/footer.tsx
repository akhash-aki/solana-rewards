import React from "react";
import TelegramLogo from "../../public/telegram";
import InstagramLogo from "../../public/instagram";
import XLogo from "../../public/x";

export default function Contact() {
  return (
    <main className=" flex flex-col relative font-custom mt-10" >
      {/* Full Height Section with Background Image */}
      <div 
        className="flex flex-col justify-center items-center bg-cover bg-center" 
      >
        <div className="mb-8 pt-6">
          <h1 className="font-bold text-5xl text-center text-black">Contact Us</h1>
        </div>
        <div className="flex gap-4 items-center">
          {/* Social Media Buttons (Empty for now, you can add icons or styles) */}
          <a href="https://www.t.me/AI_Goldie" target="_blank" rel="noopener noreferrer">
            <TelegramLogo/>
          </a>
          <a href="https://www.instagram.com/the.ai.goldie/" target="_blank" rel="noopener noreferrer">
            <InstagramLogo/>
          </a>
          <a href="https://www.x.com/the_ai_goldie" target="_blank" rel="noopener noreferrer">
            <XLogo/>
          </a>
        </div>
      </div>

      {/* Footer Content */}
      <div className="text-center p-4">
        <h4 className="text-sm text-gray-600">
          This page is designed to facilitate members of the Make America Greation Nation community claiming $MAGA token; no representations are made that the bridge will work or that any particular amount of $MAGA token will be claimed by holders. $MAGA token is intended for fun and entertainment only and has no commercial value.
        </h4>
        <h1 className="pt-4 pb-4 text-lg">© 2025 by MAGN. All rights reserved!</h1>
      </div>
    </main>
  );
}
