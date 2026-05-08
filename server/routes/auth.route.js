<<<<<<< HEAD
import authController from "../controllers/auth.controller.js";
import verifyToken from "../middlewares/auth.middleware.js";

const express = require("express");
const router = express("router");
const authController = require("../controllers/auth.controller");

router.post("/register", authController.register);
router.post("/login", authController.login);

export default router;
=======
import express from "express";
import { register, login } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

export default router;
>>>>>>> ca43ff140c733b5c4410510f0ab59383c3edbf68
