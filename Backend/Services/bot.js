import TelegramBot from 'node-telegram-bot-api';
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

const token = process.env.TELEGRAM_HTTP_API_TOKEN;
console.log("Token loaded:", Boolean(token), token.length);

const bot = new TelegramBot(token, { polling: true });

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const messageText = msg.text;

  if (messageText === '/start') {
    bot.sendMessage(chatId, 'Welcome to the bot!');
  }

  if (messageText === 'hii') {
    bot.sendMessage(chatId, 'Hello, how are you');
  }

  if (messageText === 'ping') {
    bot.sendMessage(chatId, 'pong');
  }
});