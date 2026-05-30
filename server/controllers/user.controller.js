import userService from "../services/user.service.js";

const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();

    res.status(200).json({
      message: "Users fetched successfully",
      totalUsers: users.length,
      users,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);

    res.status(200).json({
      message: "User fetched successfully",
      user,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { name, email, password, phone, role, status } = req.body;

    const user = await userService.createUser({
      name,
      email,
      password,
      phone,
      role,
      status,
    });

    res.status(201).json({
      message: "User created successfully",
      user,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await userService.updateUser(req.params.id, req.body);

    res.status(200).json({
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    await userService.deleteUser(req.params.id);

    res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;

    const user = await userService.updateUserRole(req.params.id, role);

    res.status(200).json({
      message: "User role updated successfully",
      user,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateUserStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const user = await userService.updateUserStatus(req.params.id, status);

    res.status(200).json({
      message: "User status updated successfully",
      user,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getUsersByRole = async (req, res) => {
  try {
    const { role } = req.params;

    const users = await userService.getUsersByRole(role);

    res.status(200).json({
      message: `Users with role ${role} fetched successfully`,
      totalUsers: users.length,
      users,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMyProfile = async (req, res) => {
  try {
    const user = await userService.getMyProfile(req.user._id);

    res.status(200).json({
      message: "Profile fetched successfully",
      user,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const updateMyProfile = async (req, res) => {
  try {
    const user = await userService.updateUser(req.user._id, req.body);

    res.status(200).json({
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
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
  updateMyProfile,
};
