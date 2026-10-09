const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");

const authMiddleware = async (req, res, next) => {
  try {
    let token = req.cookies.token;

    if (!token)
      return res.status(404).json({
        message: "Token not found",
        success: false,
      });

    let decode = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!decode)
      return res.status(401).json({
        success: false,
        message: "Unauthorized request",
      });

    let user = await UserModel.findById(decode.id);

    req.user = user;
    next();
  } catch (error) {
    console.log("error in middleware", error);
  }
};

module.exports = authMiddleware;
