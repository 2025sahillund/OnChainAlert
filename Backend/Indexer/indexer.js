import { provider, TOKEN_ADDRESS, ABI } from "./config.js";
import { ethers } from "ethers";
import { handleTransfer } from "./eventHandler.js";

async function startIndexer() {
  console.log("⚡ Starting indexer...");

  try {
    const contract = new ethers.Contract(
      TOKEN_ADDRESS,
      ABI,
      provider
    );

    const block = await provider.getBlockNumber();

    console.log("---------------------------------------");
    console.log("✅ INDEXER LIVE");
    console.log(`📡 Connected to Amoy Block: #${block}`);
    console.log("👀 Listening for transfers...");
    console.log("---------------------------------------");

    // ✅ CONTRACT LISTENER MUST BE INSIDE THIS FUNCTION
    contract.on("Transfer", (from, to, value, event) => {
      console.log("💎 Transfer detected");

      const txHash = event?.log?.transactionHash;

      if (!txHash) {
        console.log("⚠️ Missing tx hash, skipping");
        return;
      }

      handleTransfer(from, to, value, event);
    });

  } catch (err) {
    console.error("❌ Indexer error:", err.message);
    setTimeout(startIndexer, 3000);
  }
}

// ✅ THIS EXPORT MUST EXIST
export default startIndexer;
