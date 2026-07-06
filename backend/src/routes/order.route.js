import express from "express";

import roleBaseAuth from "../middlewares/roleBasedAuth.js";
import {
  ROLE_ADMIN,
  ROLE_CUSTOMER,
  ROLE_MERCHANT,
} from "../constants/roles.js";
import orderController from "../controllers/order.controller.js";

const router = express.Router();

router.get("/", roleBaseAuth(ROLE_ADMIN), orderController.getOrders);

router.get(
  "/user",
  roleBaseAuth(ROLE_CUSTOMER),
  orderController.getOrdersByUser,
);

router.get(
  "/merchant",
  roleBaseAuth(ROLE_MERCHANT),
  orderController.getOrdersByMerchant,
);

router.get("/:id", orderController.getOrderById);

router.post("/", roleBaseAuth(ROLE_CUSTOMER), orderController.createOrder);

router.put(
  "/:id/status",
  roleBaseAuth(ROLE_ADMIN),
  orderController.updateOrderStatus,
);

router.patch(
  "/:id/cancel",
  roleBaseAuth(ROLE_CUSTOMER),
  orderController.cancelOrder,
);

router.put(
  "/:id/confirm",
  roleBaseAuth(ROLE_CUSTOMER),
  orderController.confirmOrder,
);

router.put(
  "/:id/payment/cash",
  roleBaseAuth(ROLE_CUSTOMER),
  orderController.orderPaymentViaCash,
);

router.put(
  "/:id/payment/khalti",
  roleBaseAuth(ROLE_CUSTOMER),
  orderController.orderPaymentViaKhalti,
);

router.delete("/:id", roleBaseAuth(ROLE_ADMIN), orderController.deleteOrder);

export default router;
