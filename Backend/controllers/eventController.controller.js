import Event from "../models/EventSchema.model.js";

export const getEvents = async (req, res, next) => {
  try {
    const events = await Event.find()
      .sort({ time: -1 })
      .limit(20);

    res.json(events);
  } catch (error) {
    next(error);
  }
};

export const createEvent = async (req, res, next) => {
  try {
    const { from, to, amount, type } = req.body;

    if (!from || !to || !amount || !type) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const event = await Event.create({
      from,
      to,
      amount,
      type
    });

    res.status(201).json(event);
  } catch (error) {
    next(error);
  }
};
