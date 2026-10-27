import express from "express";
import { registerUserController } from "../controllers/auth.controller.js";

const router = express.Router();

// router.post("/me")

router.post("/register", registerUserController);
// router.post("/login");
// router.post("/logout");

export default router;
