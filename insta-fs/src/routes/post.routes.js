import express from "express";
import {
  createPostController,
  updatePostController,
} from "../controllers/post.controller.js";
import { uplaods } from "../config/multer.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post(
  "/create",
  authMiddleware,
  uplaods.array("images", 5),
  createPostController
);

router.patch(
  "/update/:postId",
  authMiddleware,
  uplaods.array("images", 5),
  updatePostController
);

export default router;
