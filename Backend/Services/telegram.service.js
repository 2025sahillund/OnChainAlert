import TelegramBot from "node-telegram-bot-api";
import Chat from "../models/chat.model.js";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve("../.env") });

// 🚫 NO polling here
const bot = new TelegramBot(process.env.TELEGRAM_HTTP_API_TOKEN);

export async function sendTelegramAlert(message) {
  const chats = await Chat.find();
  for (const chat of chats) {
    await bot.sendMessage(chat.chatId, message);
  }
}
