import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product name is required."],
    minLength: [3, "Name should have the characters more than equal to 3."],
    maxLength: 50,
  },
  brand: {
    type: String,
  },
  category: {
    type: String,
    required: [true, "Category is required."],
  },
  price: {
    type: Number,
    required: [true, "Price is required."],
    min: [1, "Price must be greater than Re. 1"],
    max: [999999, "Price must be less than 9,99,999"],
  },
  stock: {
    type: Number,
    min: 0,
    default: 1,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Created by user ID is required."],
  },
  imageUrls: {
    type: [String],
  },
  description: {
    type: String,
  },
});

export default mongoose.model("Product", productSchema);
