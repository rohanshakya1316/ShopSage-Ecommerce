import express from "express";
import userController from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

// ── My profile routes ──────────────────────────
// must be ABOVE /:id to avoid conflict
router.get("/me", authMiddleware.protect, userController.getMyProfile);
router.patch("/me", authMiddleware.protect, userController.updateMyProfile);

// ── Admin only routes ──────────────────────────
router.get(
  "/",
  authMiddleware.protect,
  authMiddleware.isAdmin,
  userController.getAllUsers,
);
router.post(
  "/",
  authMiddleware.protect,
  authMiddleware.isAdmin,
  userController.createUser,
);
router.get(
  "/role/:role",
  authMiddleware.protect,
  authMiddleware.isAdmin,
  userController.getUsersByRole,
);
router.get(
  "/:id",
  authMiddleware.protect,
  authMiddleware.isAdmin,
  userController.getUserById,
);
router.patch(
  "/:id",
  authMiddleware.protect,
  authMiddleware.isAdmin,
  userController.updateUser,
);
router.delete(
  "/:id",
  authMiddleware.protect,
  authMiddleware.isAdmin,
  userController.deleteUser,
);
router.patch(
  "/:id/role",
  authMiddleware.protect,
  authMiddleware.isAdmin,
  userController.updateUserRole,
);
router.patch(
  "/:id/status",
  authMiddleware.protect,
  authMiddleware.isAdmin,
  userController.updateUserStatus,
);

export default router;
