import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import UserModel from "../models/user.model.js";

export const authMiddleware = async (req, res, next) => {
  try {
    let accessToken = req.cookies.accessToken;

    if (!accessToken)
      return res.status(404).json({
        success: false,
        message: "token not found",
      });

    let decode = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

    if (!decode)
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });

    let user = await UserModel.findById(decode.id);

    req.user = user;
    next();
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
