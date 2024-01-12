const logger = require("./Logging");
const ErrorResponse = require("./ErrorResponse");

const errorMiddleware = async (err, req, res, next) => {
     try {
          if (!err) {
               next();
               return;
          }
          if (err instanceof ErrorResponse) {
               logger.error(err.message);
               res.status(err.status).json({
                    message: "error",
                    error: err.message,
               });
          } else {
               logger.error(err.message);
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
