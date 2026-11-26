import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";
import errorHandler from "./middlewares/error.middleware.js";
import ApiError from "./utils/ApiError.js";
import cacheInstance from "./config/cache.js";

const app = express();

cacheInstance.on("connect", () => {
  console.log("redis connected");
});

cacheInstance.on("error", (err) => {
  console.log("redis error", err);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "E-comm server is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/product", productRoutes);
// 404 handler
app.use((req, res, next) => {
  next(new ApiError(404, `Route not found: ${req.method} ${req.originalUrl}`));
});

// Global error middleware (must be last)
app.use(errorHandler);

export default app;
