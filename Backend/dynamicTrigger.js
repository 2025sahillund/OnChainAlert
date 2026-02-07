import axios from "axios";

// change if your backend port is different
const BACKEND_URL = "http://localhost:8000/events";
//const BACKEND_URL = "http://localhost:8000/events/create";

// random ethereum-style address
function randomAddress() {
  return "0x" + Math.random().toString(16).substring(2, 42).padEnd(40, "0");
}

// random amount (mix of small + large)
function randomAmount() {
  const big = Math.random() > 0.5;
  return big
    ? Math.floor(Math.random() * 100000) + 10000   // HIGH value
    : Math.floor(Math.random() * 50) + 1;          // LOW value
}

setInterval(async () => {
  const event = {
    from: randomAddress(),
    to: randomAddress(),
    amount: randomAmount(),
    token: "DMT",
    transactionHash: "dyn_" + Date.now() + "_" + Math.floor(Math.random() * 1000),
    type: "TRANSFER"
  };

  console.log("\n📞 CALL DETAILS");
  console.log("----------------------------");
  console.log("From:", event.from);
  console.log("To:", event.to);
  console.log("Amount:", event.amount);
  console.log("Token:", event.token);
  console.log("TxHash:", event.transactionHash);
  console.log("----------------------------");

  try {
    await axios.post(BACKEND_URL, event);
    console.log("✅ Event sent to backend");
  } catch (err) {
    console.log("❌ Backend not reachable");
  }
}, 5000);
