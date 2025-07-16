// src/app/components/ConnectFuelWallet.tsx
'use client';

import { useState } from 'react';
import { getWalletFromBrowser } from '../utils/wallet';

export default function ConnectFuelWallet() {
  const [address, setAddress] = useState<string | null>(null);

  const connect = async () => {
    const wallet = await getWalletFromBrowser();
    if (wallet) {
      setAddress(wallet.address.toString());
    }
  };

  return (
    <div className="p-4">
      <button
        className="bg-black text-white px-4 py-2 rounded-lg"
        onClick={connect}
      >
        Connect Fuel Wallet
      </button>
      {address && <p className="mt-4">Connected: {address}</p>}
    </div>
  );
}
