// // frontend/utils/wallet.ts
// declare global {
//   interface Window {
//     fuel?: any;
//   }
// }

// import { Fuel } from 'fuels';

// export async function getWalletFromBrowser() {
//   if (!window.fuel) throw new Error('Fuel Wallet not found in browser');

//   await window.fuel.connect();

//   const accounts = await window.fuel.accounts();
//   const address = accounts[0];
//     console.log(window.fuel)
//   const wallet = await window.fuel.getWallet(address);
//   return { wallet, address };
// }


// src/app/utils/wallet.ts

import { Wallet } from 'fuels';

// Extend the Window interface to support Fuel
declare global {
  interface Window {
    fuel?: {
      connect: () => Promise<void>;
      accounts: () => Promise<string[]>;
      getWallet: (address: string) => Promise<Wallet>;
      isConnected: () => Promise<boolean>;
    };
  }
}

/**
 * Connect to Fuel Wallet in the browser and get the Wallet instance.
 */
export async function getWalletFromBrowser() {
  // Check if Fuel Wallet extension is available
  if (!window.fuel) {
    throw new Error('⛔️ Fuel Wallet not found. Please install the extension from https://wallet.fuel.network/');
  }

  // Check if already connected
  const isConnected = await window.fuel.isConnected();
  if (!isConnected) {
    await window.fuel.connect();
  }

  const accounts = await window.fuel.accounts();
  if (!accounts.length) {
    throw new Error('⚠️ No Fuel accounts found. Please create one in your Fuel Wallet.');
  }

  const address = accounts[0];
  const wallet = await window.fuel.getWallet(address);

  return { wallet, address };
}
