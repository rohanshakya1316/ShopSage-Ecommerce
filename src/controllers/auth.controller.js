import User from "../models/User.js";
import authService from "../services/auth.service.js";
import jwt from "../utils/jwt.js";

const login = async (req, res) => {
  const input = req.body;

  try {
    const user = await authService.login(input);

    const token = jwt.createToken(user);

    const verifiedToken = jwt.verifyToken(token); 

    res.cookie("authToken", token, { maxAge: 86400 * 1000 });

    res.json({ ...user, token, verifiedToken });
  } catch (error) {
    res.status(error.status || 400).send(error.message);
  }
};

const register = async (req, res) => {
  const input = req.body;
  try {
    const user = await authService.register(input);

    const token = jwt.createToken(user);

    res.cookie("authToken", token, {
      maxAge: 86400 * 1000,
    });

    res.cookie("authToken", token, { maxAge: 86400 * 1000 });

    res.json({ ...user, token });
  } catch (error) {
    res.status(error.status || 400).send(error.message);
  }
};

const forgetPassword = async (req, res) => {
  const input = req.body;
  try {
    const data = await authService.forgetPassword(input?.email);

    res.json(data);
  } catch (error) {
    res.status(error.status || 400).send(error.message);
  }
};

const resetPassword = async (req, res) => {
  const input = req.body;
  try {
    const data = await authService.resetPassword(input);

    res.json(data);
  } catch (error) {
    res.status(error.status || 400).send(error.message);
  }
};

export default { register, login, forgetPassword, resetPassword };
