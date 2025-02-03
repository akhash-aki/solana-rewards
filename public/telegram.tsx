// components/Logo.js
import React from "react";
import Image from "next/image";

const TelegramLogo = () => {

    return (
    <div className=""> 
        <Image src="/telegram.png" alt="My Logo" width={55} height={55}  />
    </div>
    );
  };
  
  export default TelegramLogo;
  