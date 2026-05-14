import "dotenv/config";
import express from "express";
import connectDB from "./server/config/db.js";
import authRoutes from "./server/routes/auth.route.js";
import orderRoutes from "./server/routes/order.route.js";



const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, ".env") });
import authRouter from "./server/routes/auth.route.js";
import productRouter from "./server/routes/product.routes.js";

connectDB();

const app = express();
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);

app.get("/", (req, res) => {
  res.json({ message: "ShopSage API is running" });
});

// routes
app.use("/api/auth", authRouter);
app.use("/api/product", productRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
