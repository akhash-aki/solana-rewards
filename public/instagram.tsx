// components/Logo.js
import React from "react";
import Image from "next/image";

const InstagramLogo = () => {

    return (
    <div className=""> 
        <Image src="/instagram.png" alt="My Logo" width={55} height={55}  />
    </div>
    );
  };
  
  export default InstagramLogo;
  