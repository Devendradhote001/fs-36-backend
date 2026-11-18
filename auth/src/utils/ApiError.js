class ApiError extends Error {
  constructor(message, statusCode, error) {
    super(message);

    this.message = message;
    this.statusCode = statusCode;
    this.error = error;
  }
}

module.exports = ApiError;
