import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

// Verifies the access token (cookie or "Authorization: Bearer <token>")
export const verifyJWT = asyncHandler(async (req, res, next) => {
  const token =
    req.cookies?.accessToken ||
    req.headers.authorization?.replace("Bearer ", "");

  if (!token) throw new ApiError(401, "Unauthorized: access token missing");

  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  const user = await User.findById(decoded._id);
  if (!user) throw new ApiError(401, "Invalid access token");

  req.user = user;
  next();
});

// Restrict a route to specific roles, e.g. authorizeRoles("admin", "seller")
export const authorizeRoles = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user?.role)) {
    return next(new ApiError(403, `Role '${req.user?.role}' is not allowed to access this resource`));
  }
  next();
};


