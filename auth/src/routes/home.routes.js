const express = require("express");
const { getHomeDataController } = require("../controllers/home.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/", authMiddleware, getHomeDataController);

module.exports = router;
