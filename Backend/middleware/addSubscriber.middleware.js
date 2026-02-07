import Chat from "../models/chat.model.js";

export async function addSubscriber(msg, bot) {
  const chatId = msg.chat.id;

  const exists = await Chat.findOne({ chatId });
  if (exists) {
    return bot.sendMessage(chatId, "✅ You are already subscribed");
  }

  await Chat.create({ chatId });
  bot.sendMessage(chatId, "🎉 Subscribed to alerts");
}