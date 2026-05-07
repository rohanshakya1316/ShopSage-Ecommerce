import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  productVarId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProductVariant",
    default: null,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  price: {
    type: Number,
    required: true,
  },
});

const orderSchema = new mongoose.Schema(
  {
    orderNo: {
      type: String,
      required: true,
      unique: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    shippingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ShippingLocation",
      default: null,
    },
    items: [orderItemSchema],
    totalAmt: {
      type: Number,
      required: true,
    },
    discountAmt: {
      type: Number,
      default: 0,
    },
    grossAmt: {
      type: Number,
      required: true,
    },
    shippingAmt: {
      type: Number,
      default: 0,
    },
    netAmt: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    paymentStatus: {
      type: String,
      enum: ["unpaid", "paid", "refunded"],
      default: "unpaid",
    },
    payMethod: {
      type: String,
      enum: ["eSewa", "Khalti"],
      default: null,
    },
    transactionId: {
      type: String,
      default: null,
    },
  },
  { timestamps: true },
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
