import mongoose from "mongoose";
import config from "./config.js";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.mongodbUrl);
    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.log(error);
  } finally {
    console.log("Connection process completed!");
  }
};

export default connectDB;
