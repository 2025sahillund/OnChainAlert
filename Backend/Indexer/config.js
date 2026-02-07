import { ethers } from "ethers";

// ✅ RPC is fine (Tenderly works)
export const RPC_URL = "https://polygon-amoy.gateway.tenderly.co";

export const provider = new ethers.JsonRpcProvider(
  RPC_URL,
  {
    name: "polygon-amoy",
    chainId: 80002
  }
);

// 🔴 PASTE YOUR REAL CONTRACT ADDRESS HERE
export const TOKEN_ADDRESS = "0x41a8C8beE578FE7b26D3400C080503a88ed2D7a9";

// ERC-20 Transfer event ABI
export const ABI = [
  "event Transfer(address indexed from, address indexed to, uint256 value)"
];
