import dotenv from "dotenv";
import TelegramBot from "node-telegram-bot-api";
import mongoose from "mongoose";
import Chat from "../models/chat.model.js";
import path from "path";

// 🔥 EXPLICIT PATH (DO NOT CHANGE)
dotenv.config({
  path: path.resolve("../.env")
});

const token = process.env.TELEGRAM_HTTP_API_TOKEN;

console.log("BOT TOKEN:", token);

if (!token) {
  console.error("❌ Telegram token missing");
  process.exit(1);
}

await mongoose.connect(process.env.MONGO_URI);
console.log("✅ MongoDB connected (bot)");

const bot = new TelegramBot(token, { polling: true });
console.log("🤖 Telegram bot LIVE");

bot.on("message", async (msg) => {
  if (msg.text === "/start") {
    await Chat.updateOne(
      { chatId: msg.chat.id },
      { chatId: msg.chat.id },
      { upsert: true }
    );
    bot.sendMessage(msg.chat.id, "✅ Subscribed to alerts");
  }
});

export default bot;
