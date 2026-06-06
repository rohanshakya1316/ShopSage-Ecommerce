import express from "express";
import multer from "multer";

import fs from "fs/promises";
import config from "./config/config.js";

import productRoute from "./routes/product.route.js";
import userRoute from "./routes/user.route.js";
import connectDB from "./config/database.js";
import bodyParser from "body-parser";
import authRoute from "./routes/auth.route.js";
import pageRoute from "./routes/page.route.js";
import logger from "./middlewares/logger.js";
import auth from "./middlewares/auth.js";
import connectCloudinary from "./config/cloudinary.js";
import orderRoute from "./routes/order.route.js";

const app = express();

const upload = multer({ storage: multer.memoryStorage() });

connectDB();

connectCloudinary();

app.use(bodyParser.json());
app.use(logger);

app.set("view engine", "hbs");

app.get("/", (request, response) => {
  response.json({
    status: "ok",
    verison: "0.1.0",
    port: config.port,
  });
});

app.use("/api/products", upload.array("images", 5), productRoute);

app.use("/api/auth", authRoute);

app.use("/api/users", auth, upload.single("image"), userRoute);

app.use("/api/orders", auth, orderRoute);

app.use("/pages", pageRoute);

app.listen(config.port, () => {
  console.log(`Server running at ${config.port}  .....`);
});
