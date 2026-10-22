const express = require("express");
const {
  registerController,
  loginController,
} = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/me", authMiddleware, (req, res) => {
  return res.status(200).json({
    success: true,
    message:"Logged in user",
    data:req.user
  });
});
router.post("/register", registerController);
router.post("/login", loginController);

module.exports = router;
