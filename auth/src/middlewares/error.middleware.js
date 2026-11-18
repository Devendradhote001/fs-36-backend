const errorMiddleware = (err, req, res, next) => {
  let message = err.message;
  let statusCode = err.statusCode;
  let error = err.error || "Internal server error";

  return res.status(statusCode).json({
    success: false,
    message: message || "internal server error",
  });
};

module.exports = errorMiddleware;
