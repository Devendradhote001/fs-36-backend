import express from "express";
import { createPostController } from "../controllers/post.controller.js";
import { uploads } from "../config/multer.js";

const router = express.Router();

router.post("/create", uploads.array("images", 5), createPostController);

export default router;
