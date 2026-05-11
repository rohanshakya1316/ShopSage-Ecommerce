import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    role: {
      type: [String],
      enum: ["CUSTOMER", "MERCHANT", "ADMIN"],
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive", "banned"],
      default: "active",
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

export default User;
