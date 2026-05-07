import mongoose from "mongoose";

const shippingLocationSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fullAddress: {
      type: String,
      required: true,
      trim: true,
    },
    province: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    zipPostalCode: {
      type: String,
      trim: true,
      default: null,
    },
  },
  { timestamps: true },
);

const ShippingLocation = mongoose.model(
  "ShippingLocation",
  shippingLocationSchema,
);

export default ShippingLocation;
