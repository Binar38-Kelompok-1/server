const passport = require("./passport");
const ResponseError = require("../middleware/responseError");

const authenticate = passport.authenticate("jwt", { session: false });

const isUser = (req, res, next) => {
  if (req.user.role == "user") {
    next();
  } else {
    throw new ResponseError(401, "Unauthorized");
  }
};

const isAdmin = (req, res, next) => {
  if (req.user.role == "admin") {
    next();
  } else {
    throw new ResponseError(401, "Unauthorized");
  }
};

module.exports = { authenticate, isUser, isAdmin };
