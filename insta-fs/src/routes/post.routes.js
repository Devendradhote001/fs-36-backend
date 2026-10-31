import express from "express";
import {
  createPostController,
  getAllPostController,
  getSinglePostController,
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

router.get("/all-post", authMiddleware, getAllPostController);
router.get("/:postId", getSinglePostController);

export default router;
