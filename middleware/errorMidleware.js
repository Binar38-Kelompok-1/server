const ResponseError = require("./responseError");

const errorMiddleware = async (err, req, res, next) => {
  try {
    if (!err) {
      next();
      return;
    }
    if (err instanceof ResponseError) {
      res.status(err.status).json({
        message: "error",
        error: err.message,
      });
    } else {
      res.status(500).json({
        message: "internal server error",
        error: err.message,
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = errorMiddleware;
