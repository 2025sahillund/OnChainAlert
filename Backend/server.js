import express from "express";
import connectDB from "./Database/db.js";
import eventRoutes from "./routes/eventRoutes.routes.js";
import errorHandler from "./middleware/errorHandler.middleware.js";
import startIndexer from "./Indexer/indexer.js";

import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.resolve("D:/OnChain/OnChainAlert/Backend/.env")
});
//dotenv.config();

console.log("ENV CHECK SERVER:", {
  token: process.env.TELEGRAM_HTTP_API_TOKEN,
  mongo: process.env.MONGO_URI
});

const app = express();

// Safety check
if (!process.env.MONGO_URI) {
  console.error("MONGO_URI is missing in .env file");
  process.exit(1);
}

// Connect DB
connectDB();
console.log("Starting Cyrene-style event indexer backend...");

// Middleware
app.use(express.json());

// Routes
app.get("/", (req, res) => res.send("API is running"));
app.get("/health", (req, res) =>
  res.json({ status: "OK", database: "connected" })
);

app.use("/events", eventRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 8000;

// ✅ ONLY ONE LISTEN
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  startIndexer();
});
