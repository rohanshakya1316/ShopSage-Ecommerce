import mongoose from "mongoose";

const userRoleSchema = new mongoose.Schema(
  {
    roleName: {
      type: String,
      enum: ["Admin", "Customer", "Vendor"],
      required: true,
      unique: true,
      trim: true,
    },
  },
  { timestamps: true },
);

const UserRole = mongoose.model("UserRole", userRoleSchema);

export default UserRole;
