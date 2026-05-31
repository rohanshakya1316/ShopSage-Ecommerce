import express from "express";
import productController from "../controllers/product.controller.js";
import upload from "../middlewares/upload.middleware.js";

const router = express.Router();

router.post("/", upload.array("images", 6), productController.createProduct);

export default router;
