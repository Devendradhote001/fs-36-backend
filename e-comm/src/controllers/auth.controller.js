import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  // sameSite: "strict",
};

const ACCESS_COOKIE_AGE = 15 * 60 * 1000; // 15 minutes
const REFRESH_COOKIE_AGE = 7 * 24 * 60 * 60 * 1000; // 7 days

const generateTokens = async (user) => {
  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();
  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });
  return { accessToken, refreshToken };
};

const sendTokens = (res, statusCode, message, user, accessToken, refreshToken) => {
  const safeUser = user.toObject();
  delete safeUser.password;
  delete safeUser.refreshToken;

  res
    .status(statusCode)
    .cookie("accessToken", accessToken, { ...cookieOptions, maxAge: ACCESS_COOKIE_AGE })
    .cookie("refreshToken", refreshToken, { ...cookieOptions, maxAge: REFRESH_COOKIE_AGE })
    .json({ success: true, message, data: { user: safeUser, accessToken, refreshToken } });
};

// POST /api/auth/register
export const register = asyncHandler(async (req, res) => {
  const { fullName, mobile, email, password, role } = req.body;

  if (!fullName || !mobile || !email || !password) {
    throw new ApiError(400, "fullName, mobile, email and password are required");
  }

  // Don't allow self-registration as admin
  if (role === "admin") throw new ApiError(403, "Cannot register as admin");

  const exists = await User.findOne({ $or: [{ email }, { mobile }] });
  if (exists) throw new ApiError(409, "User with this email or mobile already exists");

  const user = await User.create({ fullName, mobile, email, password, role });
  const { accessToken, refreshToken } = await generateTokens(user);

  sendTokens(res, 201, "User registered successfully", user, accessToken, refreshToken);
});

// POST /api/auth/login  (login with email or mobile)
export const login = asyncHandler(async (req, res) => {
  const { email, mobile, password } = req.body;

  if ((!email && !mobile) || !password) {
    throw new ApiError(400, "Email or mobile, and password are required");
  }

  const user = await User.findOne(email ? { email } : { mobile }).select("+password");
  if (!user || !(await user.comparePass(password))) {
    throw new ApiError(401, "Invalid credentials");
  }

  const { accessToken, refreshToken } = await generateTokens(user);
  sendTokens(res, 200, "Logged in successfully", user, accessToken, refreshToken);
});

// POST /api/auth/refresh-token
export const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingToken = req.cookies?.refreshToken || req.body?.refreshToken;
  if (!incomingToken) throw new ApiError(401, "Refresh token missing");

  const decoded = jwt.verify(incomingToken, process.env.REFRESH_TOKEN_SECRET);
  const user = await User.findById(decoded._id).select("+refreshToken");

  if (!user || user.refreshToken !== incomingToken) {
    throw new ApiError(401, "Refresh token is invalid or has been used");
  }

  const { accessToken, refreshToken } = await generateTokens(user);
  sendTokens(res, 200, "Access token refreshed", user, accessToken, refreshToken);
});

// POST /api/auth/logout  (protected)
export const logout = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, { $unset: { refreshToken: 1 } });

  res
    .status(200)
    .clearCookie("accessToken", cookieOptions)
    .clearCookie("refreshToken", cookieOptions)
    .json({ success: true, message: "Logged out successfully" });
});

// GET /api/auth/me  (protected)
export const getMe = asyncHandler(async (req, res) => {
  res.status(200).json({ success: true, data: req.user });
});


