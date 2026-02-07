import { ethers } from "ethers";
import axios from "axios";
import processEvent from "../Processor/index.js";

const BACKEND_URL = "http://localhost:8000/events";

export async function handleTransfer(from, to, value, log) {
  try {
    const txHash = log?.transactionHash;

    if (!txHash) {
      console.log("⚠️ Missing tx hash, skipping");
      return;
    }

    const eventData = {
      from,
      to,
      amount: Number(ethers.formatUnits(value, 18)),
      token: "DMT",
      transactionHash: txHash,
      type: "TRANSFER"
    };

    console.log("📡 Event captured:", eventData);

    const filteredEvent = processEvent(eventData);
    if (!filteredEvent) return;

    await axios.post(BACKEND_URL, filteredEvent);
    console.log("✅ Event sent to backend");

  } catch (err) {
    console.error("❌ Event handler error:", err.message);
  }
}
