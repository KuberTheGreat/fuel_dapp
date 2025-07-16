import { Wallet, Provider, ContractFactory } from 'fuels';
import * as fs from 'fs';

const ABI_PATH = '/Users/kuber/Desktop/College/AXIOS Learn/WEB3/Sway/fuel-social-nft/NFT/NFT-contract/out/debug/NFT-contract-abi.json'
const BIN_PATH = '/Users/kuber/Desktop/College/AXIOS Learn/WEB3/Sway/fuel-social-nft/NFT/NFT-contract/out/debug/NFT-contract.bin'


// Define provider URL
const PROVIDER_URL = 'https://testnet.fuel.network/v1/graphql';

async function main() {
  // Create provider
  const provider = new Provider(PROVIDER_URL);

  // Load wallet from private key
  const wallet = Wallet.fromPrivateKey("0x01edb39feeb4f9f694b6bfb5cd06c30753375ef0abd4279f7404c726e2c3f629", provider);

  // Read contract bytecode and ABI
  const bytecode = fs.readFileSync(BIN_PATH);
  const abi = JSON.parse(fs.readFileSync(ABI_PATH, 'utf-8'));

  // Create factory and deploy
  const factory = new ContractFactory(bytecode, abi, wallet);
  const { contractId } = await factory.deploy();

  console.log('🎉 Contract deployed!');
  console.log('📦 Contract ID:', contractId);
//   console.log('🔁 Transaction ID:', transactionId);
}

main().catch(console.error);
