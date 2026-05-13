import "dotenv/config";
import express from "express";
import connectDB from "./server/config/db.js";
import productRouter from "./server/routes/product.routes.js";

connectDB();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "ShopSage API is running" });
});

app.use("/api/product", productRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
