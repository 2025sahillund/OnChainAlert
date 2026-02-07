// import express from "express";
// import { getEvents, createEvent } from "../controllers/eventController.controller.js";

// const router = express.Router();

// router.get("/", getEvents);
// router.post("/create", createEvent)

// export default router;
import express from "express";
import processEvent from "../Processor/index.js";
import Event from "../models/event.model.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const events = await Event.find().sort({ createdAt: -1 });
  res.json(events);
});

// ✅ MAIN INGEST ROUTE
router.post("/", async (req, res) => {
  try {
    const filtered = processEvent(req.body);

    if (!filtered) {
      console.log("🚫 Event ignored by rules");
      return res.status(200).json({ ignored: true });
    }

    const saved = await Event.create(filtered);
    console.log("📦 Event saved to Mongo:", saved._id);

    res.status(201).json(saved);
  } catch (err) {
    console.error("❌ Mongo save failed:", err.message);
    res.status(500).json({ error: err.message });
  }
});

export default router;
