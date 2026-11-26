import express from "express";
import { authorizeRoles, verifyJWT } from "../middlewares/auth.middleware.js";
import {
  createProductController,
  getAllProductController,
} from "../controllers/product.controller.js";
import { productsLimiter } from "../config/limiter.js";

const router = express.Router();

router.get("/", productsLimiter, getAllProductController);

router.post(
  "/create",
  verifyJWT,
  authorizeRoles("seller"),
  createProductController,
);

export default router;
