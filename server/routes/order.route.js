import express from "express";

import verifyToken from "../middlewares/auth.middleware.js";

import {
  createOrder,
  getMyOrders,
  getSingleOrder,
} from "../controllers/order.controller.js";
import { orderPaymentViaKhalti } from "../services/order.service.js";

const router = express.Router();

router.post("/", verifyToken, createOrder);

router.get("/my-orders", verifyToken, getMyOrders);

router.get("/:id", verifyToken, getSingleOrder);

router.put("/:id/payment/khalti", verifyToken, orderPaymentViaKhalti);

export default router;
