import { Router } from "express";
import {
  register,
  login,
  refreshAccessToken,
  logout,
  getMe,
} from "../controllers/auth.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { signUpLimiter } from "../config/limiter.js";

const router = Router();

router.post("/register", register);
router.post("/login", signUpLimiter, login);
router.post("/refresh-token", refreshAccessToken);

// Protected routes
router.post("/logout", verifyJWT, logout);
router.get("/me", verifyJWT, getMe);

export default router;
