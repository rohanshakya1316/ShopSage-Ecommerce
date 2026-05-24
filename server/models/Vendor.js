import mongoose from "mongoose";
import User from "./User.js";

const vendorSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    businessName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    phoneNo: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["PENDING", "APPROVED", "REJECTED"],
      default: "PENDING",
    },
    address: {
      type: String,
      trim: true,
    },
    vatNo: {
      type: String,
      trim: true,
    },
    paymentId: {
      type: String,
      default: null,
    },
    comRate: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

const Vendor = mongoose.model("Vendor", vendorSchema);

export default Vendor;
