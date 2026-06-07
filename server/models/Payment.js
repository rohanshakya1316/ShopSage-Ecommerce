import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  transactionId: String,

  amount: {
    type: Number,
    required: [true, "Payment amount is required."],
  },

  method: {
    type: String,
    requried: [true, "Payment method is required."],
    enum: ["Cash", "Khalti"],
  },

  status: {
    type: String,
    default: "PENDING",
    enum: ["PENDING", "SUCCESS", "FAILED"],
  },

  createdAt: {
    type: Date,
    default: Date.now(),
    immutable: true,
  },
});

export default mongoose.model("Payment", paymentSchema);
