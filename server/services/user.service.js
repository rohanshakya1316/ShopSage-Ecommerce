import User from "../models/User.js";
import bcrypt from "bcrypt";

const getAllUsers = async () => {
  const users = await User.find().select("-password");
  return users;
};

const getUserById = async (userId) => {
  const user = await User.findById(userId).select("-password");

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

const createUser = async ({ name, email, password, phone, role, status }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("Email already in use");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    phone,
    role,
    status,
  });

  const userResponse = await User.findById(user._id).select("-password");
  return userResponse;
};

const updateUser = async (userId, updateData) => {
  if (updateData.password) {
    updateData.password = await bcrypt.hash(updateData.password, 10);
  }

  // role has its own method so prevent update here
  delete updateData.role;

  const user = await User.findByIdAndUpdate(userId, updateData, {
    new: true,
    runValidators: true,
  }).select("-password");

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

const deleteUser = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  await User.findByIdAndDelete(userId);
  return true;
};

const updateUserRole = async (userId, role) => {
  const validRoles = ["CUSTOMER", "VENDOR", "ADMIN"];
  const isValidRole = role.every((r) => validRoles.includes(r));

  if (!isValidRole) {
    throw new Error(`Invalid role. Must be one of: ${validRoles.join(", ")}`);
  }

  const user = await User.findByIdAndUpdate(
    userId,
    { role },
    { new: true, runValidators: true },
  ).select("-password");

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

const updateUserStatus = async (userId, status) => {
  const validStatuses = ["active", "inactive", "banned"];

  if (!validStatuses.includes(status)) {
    throw new Error(
      `Invalid status. Must be one of: ${validStatuses.join(", ")}`,
    );
  }

  const user = await User.findByIdAndUpdate(
    userId,
    { status },
    { new: true, runValidators: true },
  ).select("-password");

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

const getUsersByRole = async (role) => {
  const users = await User.find({
    role: { $in: [role] },
  }).select("-password");
  return users;
};

const getMyProfile = async (userId) => {
  const user = await User.findById(userId).select("-password");

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

export default {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  updateUserRole,
  updateUserStatus,
  getUsersByRole,
  getMyProfile,
};
