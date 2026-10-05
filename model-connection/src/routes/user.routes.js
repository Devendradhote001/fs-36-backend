import express from "express";
import { getAllUserController } from "../controllers/users.controller";

const router = express.Router();

router.get("/", getAllUserController);

export default router;
