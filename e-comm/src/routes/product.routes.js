import express from "express";
import { authorizeRoles, verifyJWT } from "../middlewares/auth.middleware";
import { createProductController } from "../controllers/product.controller";

const router = express.Router();

router.post(
  "/create",
  verifyJWT,
  authorizeRoles(["SELLER"]),
  createProductController,
);

export default router;
