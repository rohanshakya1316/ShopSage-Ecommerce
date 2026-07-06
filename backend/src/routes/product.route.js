import express from "express";

import productController from "../controllers/product.controller.js";
import auth from "../middlewares/auth.js";
import roleBaseAuth from "../middlewares/roleBasedAuth.js";
import { ROLE_ADMIN, ROLE_MERCHANT } from "../constants/roles.js";
import validate from "../middlewares/validator.js";
import { productSchema } from "../libs/schemas/product.schema.js";

const router = express.Router();

router.get("/", productController.getAllProducts);
router.get("/first", productController.getFirstProduct);
router.get("/brands", productController.getAllBrands);
router.get("/categories", productController.getCategories);
router.get("/count", productController.getTotalCount);

router.get("/:id", productController.getProductById);

router.post(
  "/",
  auth,
  roleBaseAuth(ROLE_MERCHANT),
  validate(productSchema),
  productController.createProduct,
);

router.put(
  "/:id",
  auth,
  roleBaseAuth(ROLE_MERCHANT),
  productController.updateProduct,
);

router.delete(
  "/:id",
  auth,
  roleBaseAuth(ROLE_ADMIN),
  productController.deleteProduct,
);

export default router;
