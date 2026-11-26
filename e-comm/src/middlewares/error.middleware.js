import ApiError from "../utils/ApiError.js";

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  let error = err;

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map((e) => e.message);
    error = new ApiError(400, "Validation failed", errors);
  }
  // Duplicate key error
  else if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {}).join(", ");
    error = new ApiError(409, `${field} already exists`);
  }
  // Invalid ObjectId
  else if (err.name === "CastError") {
    error = new ApiError(400, `Invalid ${err.path}: ${err.value}`);
  }
  // JWT errors
  else if (err.name === "JsonWebTokenError") {
    error = new ApiError(401, "Invalid token");
  } else if (err.name === "TokenExpiredError") {
    error = new ApiError(401, "Token expired");
  } else if (!(err instanceof ApiError)) {
    error = new ApiError(err.statusCode || 500, err.message || "Internal Server Error");
  }

  res.status(error.statusCode).json({
    success: false,
    message: error.message,
    errors: error.errors,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

export default errorHandler;
