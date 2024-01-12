const passport = require("./Passport");

const authenticate = passport.authenticate("jwt", { session: false });

module.exports = authenticate;
