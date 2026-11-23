const express = require("express");
const {
  registerController,
  loginController,
  logoutController,
  forgetPasswordController,
  resetPasswordController,
  updatePasswordController,
} = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/me", authMiddleware, (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Logged in user",
    data: req.user,
  });
});
router.post("/register", registerController);
router.post("/login", loginController);
router.post("/logout", logoutController);

router.post("/forget-password", forgetPasswordController);
router.get("/reset-password/:token", resetPasswordController);
router.post("/update-password/:user_id", updatePasswordController);

module.exports = router;
