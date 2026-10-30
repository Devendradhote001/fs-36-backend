import express from "express";
import { getUserProfileController } from "../controllers/user.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/profile", authMiddleware, getUserProfileController);
// router.put("/follow");
// router.put("/unfollow");
// router.patch("/update/:id");

export default router;
