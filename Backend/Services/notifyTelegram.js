import TelegramBot from "node-telegram-bot-api";
import { telegramBot } from "./telegram.service.js";
import Chat from "../models/chat.model.js";

const bot = new TelegramBot(process.env.TELEGRAM_HTTP_API_TOKEN);

export async function notifyTelegram(message) {
  const chats = await Chat.find();

  for (const chat of chats) {
    await telegramBot.sendMessage(chat.chatId, message);
  }
}