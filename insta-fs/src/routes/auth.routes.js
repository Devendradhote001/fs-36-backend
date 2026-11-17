import express from "express";
import {
  getAuthUserFromGoogle,
  getCurrentUser,
  loginUserController,
  logoutController,
  registerUserController,
} from "../controllers/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import passport from "passport";

const router = express.Router();

// google auth
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
    session: false,
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/api/auth/google/failure",
    session: false,
  }),
  getAuthUserFromGoogle
);

router.get("/google/failure", (req, res) => {
  return res.status(400).json({
    message: "google authentication failed",
    success: false,
  });
});

router.post("/me", authMiddleware, getCurrentUser);

router.post("/register", registerUserController);
router.post("/login", loginUserController);
router.post("/logout", authMiddleware, logoutController);

export default router;
