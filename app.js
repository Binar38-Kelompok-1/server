const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const morgan = require("morgan");
const cors = require("cors");

const routes = require("./routes/");
const ResponseError = require("./middleware/responseError");
const errorMiddleware = require("./middleware/errorMidleware");
const passport = require("./authentication/passport");
// const ejs = require("ejs");
// const path = require("path");
const session = require("express-session");
// const flash = require("connect-flash");
// const expressEjsLayouts = require("express-ejs-layouts");
//
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(expressEjsLayouts);
// app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "oreo",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 60000,
    },
  })
);
// app.use(flash());
app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(passport.initialize());
// app.use(morgan("dev"));

app.use(routes);

// app.use("/", (req, res) => {
//   //   res.status(404).json({ error: "Page not found" });
//   res.render("404", {
//     layout: "404",
//   });
// });

app.use("*", (req, res, next) => {
  const endpoint = req.originalUrl;
  next(new ResponseError(404, `${endpoint} endpoint not found! `));
});

app.use(errorMiddleware);

module.exports = app;
