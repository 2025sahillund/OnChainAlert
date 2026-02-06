import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  from: {
    type: String,
    required: true
  },
  to: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  time: {
    type: Date,
    default: Date.now
  }
});

const Event = mongoose.model("Event", eventSchema);

export default Event;
