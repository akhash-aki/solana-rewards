// Example Component
'use client';

import React from 'react';
import useWalletStore from '@/components/walletstore';

const WalletPublicKeyDisplay: React.FC = () => {
  const walletPublicKey = useWalletStore((state) => state.walletPublicKey);

  return (
    <div>
      {walletPublicKey ? (
        <p>Your wallet public key is: {walletPublicKey.toString()}</p>
      ) : (
        <p>No wallet connected.</p>
      )}
    </div>
  );
};

export default WalletPublicKeyDisplay;
