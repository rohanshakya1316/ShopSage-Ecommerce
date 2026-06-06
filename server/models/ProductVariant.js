import mongoose from "mongoose";

const productVariantSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    color: {
      type: String,
      trim: true,
      default: null,
    },
    size: {
      type: String,
      trim: true,
      default: null,
    },
    price: {
      type: Number,
      required: true,
    },
    stockQuantity: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

const ProductVariant = mongoose.model("ProductVariant", productVariantSchema);

export default ProductVariant;
