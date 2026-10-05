const express = require("express");
const {
  createUserController,
  getSingleUserController,
} = require("../controllers/user.controller");

const router = express.Router();

router.post("/create", createUserController);
router.get("/:id", getSingleUserController);

module.exports = router;
