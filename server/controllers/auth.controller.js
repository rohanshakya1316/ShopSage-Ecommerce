<<<<<<< HEAD
import authService from "../services/auth.service.js";

const authService = require("../services/auth.service");

const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const result = await authService.register({ name, email, password, role });
    return res
      .status(201)
      .json({ message: "User registered successfully", data: result });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await authService.login({ email, password });
    return res.status(200).json({ message: "Login successful", data: result });
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};

const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    const result = await authService.refreshToken(refreshToken);
    return res.status(200).json({ data: result });
  } catch (err) {
    return res.status(403).json({ message: err.message });
  }
};

export default { register, login, refreshToken };
=======
export const register = (req, res) => {
  res.json({ message: "Register working" });
};

export const login = (req, res) => {
  res.json({ message: "Login working" });
};
>>>>>>> ca43ff140c733b5c4410510f0ab59383c3edbf68
