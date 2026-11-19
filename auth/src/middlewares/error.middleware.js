const errorMiddleware = (err, req, res, next) => {

  console.log(err)
  let message = err.message;
  let statusCode = err.statusCode || 500;
  let error = err.error || "Internal server error";

  return res.status(statusCode).json({
    success: false,
    message: message || "internal server error",
  });
};

module.exports = errorMiddleware;
