import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    role: {
      type: [String],
      enum: ["CUSTOMER", "VENDOR", "ADMIN"],
      required: true,
    },
    name: {
      type: String,
      required: [true,"User name is required"],
      minLength : 3,
      maxLength : 50,
      trim: true,
    },
    email: {
      type: String,
      required: [true,"Email is require"],
      lowercase : true,
      unique: true,
      
      
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
