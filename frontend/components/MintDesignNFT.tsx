'use client';

import { useState } from 'react';
import { useAccount } from 'wagmi';
import { Provider, Wallet, Contract, JsonAbi } from 'fuels';
import { v4 as uuidv4 } from 'uuid';
import abiJson from '../contracts/nft-contract.json'

// ✅ Replace with your actual contract ID and optionally ABI if needed
const CONTRACT_ID = '0xf51fc0d961f27ffb31be480c0c6b1d0aa5a7f9473eb250eeadd7abb563ff1a93';

const MintDesignNFT = () => {
  const { address, isConnected } = useAccount();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [status, setStatus] = useState('');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleMint = async () => {
    if (!isConnected || !address || !imageFile || !name || !description) {
      setStatus('Please fill all fields and connect wallet!');
      return;
    }

    try {
      setStatus('Uploading image to IPFS...');
      // 👉 Simulate image + metadata upload to IPFS (replace with real logic later)
      const imageCID = uuidv4(); // fake CID
      const metadata = {
        name,
        description,
        image: `ipfs://${imageCID}`,
      };

      setStatus('Minting NFT...');

      const provider = new Provider('https://testnet.fuel.network/v1/graphql');
      const wallet = Wallet.fromAddress(address, provider);
      const contract = new Contract(CONTRACT_ID, abiJson as unknown as JsonAbi, wallet);

      // 📦 Mint function assumes `mint` is a payable method in your contract
      const subId = crypto.randomUUID(); // for uniqueness
      const tx = await contract.functions
        .mint({ value: 1 }) // adjust args if needed
        .callParams({ gasLimit: 10_000_000 })
        .txParams({})
        .call();

      setStatus(`NFT Minted! Tx ID: ${tx.transactionId}`);
    } catch (err: any) {
      console.error(err);
      setStatus('Minting failed.');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl p-4 shadow-md space-y-4">
      <h2 className="text-xl font-bold text-center">Mint Your NFT</h2>

      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="w-full p-2 border rounded"
      />

      <input
        type="text"
        placeholder="Design Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 border rounded"
      />

      <textarea
        placeholder="Design Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 border rounded"
      />

      <button
        onClick={handleMint}
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 w-full"
      >
        Mint NFT
      </button>

      {status && <p className="text-center text-sm mt-2">{status}</p>}
    </div>
  );
};

export default MintDesignNFT;
