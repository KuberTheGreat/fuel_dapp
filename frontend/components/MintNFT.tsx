// frontend/utils/mintNFT.ts
import { Wallet, Contract, JsonAbi, Provider, Address, bn } from 'fuels';
import abiJson from '../contracts/nft-contract.json'; // path to your ABI
import { getWalletFromBrowser } from '../utils/wallet';

const CONTRACT_ID = '0xf51fc0d961f27ffb31be480c0c6b1d0aa5a7f9473eb250eeadd7abb563ff1a93';

export async function mintNFT(subIdHex: string) {
  try {
    // Connect to wallet
    const { wallet, address } = await getWalletFromBrowser();

    // Load the contract (no bytecode required, just ABI and ID)
    const contract = new Contract(CONTRACT_ID, abiJson as unknown as JsonAbi, wallet);

    // Call the mint function
    const subId = subIdHex.padEnd(64, '0'); // must be 32-byte hex padded
    const amount = bn(1);

    const tx = await contract.functions
      .mint({ Address: address }, subId, amount)
      .call();

    console.log('✅ NFT minted:', tx);
    return tx;
  } catch (err) {
    console.error('❌ Minting failed:', err);
    throw err;
  }
}
