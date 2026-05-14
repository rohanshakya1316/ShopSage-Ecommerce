import express from "express";
import productController from "../controllers/product.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

// public routes
router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);

// private routes - vendor only
router.post(
  "/",
  authMiddleware.protect,
  authMiddleware.isVendor,
  productController.createProduct,
);

router.get(
  "/vendor/my-products",
  authMiddleware.protect,
  authMiddleware.isVendor,
  productController.getMyProducts,
);
router.patch(
  "/:id",
  authMiddleware.protect,
  authMiddleware.isVendor,
  productController.updateProduct,
);
router.delete(
  "/:id",
  authMiddleware.protect,
  authMiddleware.isVendor,
  productController.deleteProduct,
);

export default router;
