const express = require("express");
const { registerController } = require("../controllers/auth.controller");

const router = express.Router();

router.post("/register", registerController);
// router.post("/login");

module.exports = router;
