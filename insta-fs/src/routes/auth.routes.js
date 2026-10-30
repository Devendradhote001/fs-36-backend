import express from "express";
import {
  getCurrentUser,
  loginUserController,
  logoutController,
  registerUserController,
} from "../controllers/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/me", authMiddleware, getCurrentUser);

router.post("/register", registerUserController);
router.post("/login", loginUserController);
router.post("/logout", authMiddleware, logoutController);

export default router;
