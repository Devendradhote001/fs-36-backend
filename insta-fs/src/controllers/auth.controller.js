import UserModel from "../models/user.model.js";
import { generateToken } from "../utils/token.js";
import dotenv from "dotenv";
dotenv.config();

export const registerUserController = async (req, res) => {
  try {
    let { fullName, userName, email, password, mobile } = req.body;

    if (!userName || !email || !password)
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });

    let isExists = await UserModel.findOne({ email });

    if (isExists)
      return res.status(409).json({
        success: false,
        message: "User already exist",
      });

    let user = await UserModel.create({
      userName,
      fullName,
      password,
      email,
      mobile,
    });

    let accessToken = generateToken(
      user._id,
      process.env.ACCESS_TOKEN_SECRET,
      "30m",
    );

    let refreshToken = generateToken(
      user._id,
      process.env.REFRESH_TOKEN_SECRET,
      "1h",
    );

    user.refreshToken = refreshToken;
    await user.save();

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 30 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      message: "user registered",
      success: true,
      data: user,
    });
  } catch (error) {
    console.log("error in reg", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const loginUserController = async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });

    let isExists = await UserModel.findOne({ email });

    if (!isExists)
      return res.status(404).json({
        success: false,
        message: "User not found",
      });

    let checkPass = isExists.comparePass(password);

    if (!checkPass)
      return res.status(401).json({
        message: "Invalid credentials",
        success: false,
      });

    let accessToken = generateToken(
      isExists._id,
      process.env.ACCESS_TOKEN_SECRET,
      "30m",
    );

    let refreshToken = generateToken(
      isExists._id,
      process.env.REFRESH_TOKEN_SECRET,
      "1h",
    );

    user.refreshToken = refreshToken;
    await user.save();

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 30 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      message: "user Logged in",
      success: true,
      data: isExists,
    });
  } catch (error) {
    console.log("error in reg", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
