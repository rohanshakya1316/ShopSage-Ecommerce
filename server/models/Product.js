import mongoose from "mongoose";
import Category from "./Category.js";
import Vendor from "./Vendor.js";

const productSchema = new mongoose.Schema(
  {
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
    },
    catId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    productName: {
      type: String,
      required: true,
      trim: true,
    },
    urlSlug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    descriptionShort: {
      type: String,
      trim: true,
    },
    descriptionLong: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    stockQuantity: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["active", "inactive", "out_of_stock"],
      default: "active",
    },
  },
  { timestamps: true },
);

const Product = mongoose.model("Product", productSchema);

export default Product;
