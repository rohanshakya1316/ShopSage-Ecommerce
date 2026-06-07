import mongoose from "mongoose";

const userRoleSchema = new mongoose.Schema(
  {
    roleName: {
      type: String,
      enum: ["CUSTOMER", "VENDOR", "ADMIN"],
      required: true,
      unique: true,
      trim: true,
    },
  },
  { timestamps: true },
);

const UserRole = mongoose.model("UserRole", userRoleSchema);

export default UserRole;
