// import axios from "axios";

// export default async function sendToDatabase(event) {
//   const payload = {
//     ...event,
//     type: "TRANSFER"
//   };

//   try {
//     console.log("📦 Sending event:", payload);
//     await axios.post("http://localhost:8000/events", payload);
//     console.log("✅ Mongo save request sent");
//   } catch (err) {
//     console.error("❌ Mongo save failed:", err.message);
//   }
// }

import axios from "axios";
import { sendTelegramAlert } from "../Services/telegram.service.js";

export default async function sendToDatabase(event) {
  const payload = {
    ...event,
    transactionHash: event.txHash, // ✅ FIX
    type: "TRANSFER"
  };

  // optional: remove txHash to avoid confusion
  delete payload.txHash;

  try {
    console.log("📦 Sending event:", payload);
await axios.post("http://localhost:8000/events", {
  ...event,
  transactionHash: event.transactionHash
});
    console.log("✅ Saved to MongoDB");
  } catch (err) {
    console.error("❌ Mongo save failed:", err.message);
    return;
  }

  await sendTelegramAlert(
    `🚨 HIGH VALUE TRANSFER\n\n` +
    `From: ${payload.from}\n` +
    `To: ${payload.to}\n` +
    `Amount: ${payload.amount} ${payload.token}\n` +
    `Tx: ${payload.transactionHash}`
  );
}
