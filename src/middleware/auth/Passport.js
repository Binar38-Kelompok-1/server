const passport = require("passport");
const { Strategy } = require("passport-jwt");
const DB = require("../DB");

const JWT_SECRET = "JWT_SUPER_SECRET_CODE";

const options = {
     jwtFromRequest: (req) => {
          return req.cookies.authorization;
     },
     secretOrKey: JWT_SECRET,
};

const extractToken = async (payload, done) => {
     try {
          const user = await DB("users")
               .where({ id: payload.id })
               .first(["id"]);
          if (!user) {
               return done(null, false);
          }
          return done(null, user);
     } catch (error) {
          return done(error, false);
     }
};

passport.use(new Strategy(options, extractToken));

module.exports = passport;
