import Event from "../models/event.model.js";
import { sendTelegramAlert } from "../Services/telegram.service.js";

// ✅ CREATE EVENT
export async function createEvent(req, res) {
  try {
    const {
      from,
      to,
      amount,
      token,
      transactionHash,
      type
    } = req.body;

    // ✅ REQUIRED FIELD CHECK
    if (!transactionHash) {
      return res.status(400).json({ error: "transactionHash required" });
    }

    const event = await Event.create({
      from,
      to,
      amount,
      token,
      transactionHash,
      type
    });

    // 🔔 TELEGRAM ALERT (AFTER SAVE)
    await sendTelegramAlert(
      `🚨 ${type || "TRANSFER"}\n\n` +
      `From: ${from}\n` +
      `To: ${to}\n` +
      `Amount: ${amount} ${token}\n` +
      `Tx: ${transactionHash}`
    );

    res.status(201).json(event);

  } catch (err) {
    console.error("❌ Mongo save failed:", err.message);
    res.status(500).json({ error: "Failed to save event" });
  }
}

// ✅ GET EVENTS
export async function getEvents(req, res) {
  const events = await Event.find().sort({ createdAt: -1 });
  res.json(events);
}
