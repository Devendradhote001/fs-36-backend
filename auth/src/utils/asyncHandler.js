const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res)).catch(next)
  };
};

module.exports = asyncHandler;