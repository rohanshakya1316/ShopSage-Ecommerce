import authController from "../controllers/auth.controller.js";
import { registerSchema } from "../libs/schemas/auth.schema.js";
import verifyToken from "../middlewares/auth.middleware.js";

const express = require("express");
const router = express("router");
const authController = require("../controllers/auth.controller");

router.post("/register",validate(registerSchema), authController.register);
router.post("/login", authController.login);

export default router;
