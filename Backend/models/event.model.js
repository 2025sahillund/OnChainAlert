import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
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
    token: {
      type: String,
      required: true
    },
    transactionHash: {
      unique: true,
      type: String,
      required: true
    },
    alertType: {
      type: String,
      default: "HIGH_VALUE_TRANSFER"
    }
  },
  {
    timestamps: true
  }
);

// ✅ THIS LINE PREVENTS OverwriteModelError
const Event =
  mongoose.models.Event || mongoose.model("Event", eventSchema);

export default Event;
