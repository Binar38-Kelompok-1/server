require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
// const morgan = require("morgan");
const cors = require("cors");
const swaggerjsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const routes = require("./routes/");
const ResponseError = require("./middleware/responseError");
const errorMiddleware = require("./middleware/errorMidleware");
const passport = require("./authentication/passport");
// const ejs = require("ejs");
// const path = require("path");
// const session = require("express-session");
// const flash = require("connect-flash");
// const expressEjsLayouts = require("express-ejs-layouts");
//
// app.set("view engine", "ejs");
// app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(expressEjsLayouts);
// app.use(express.static(path.join(__dirname, "public")));
// app.use(
//   session({
//     secret: "oreo",
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       maxAge: 60 * 60 * 60000,
//     },
//   })
// );
// app.use(flash());
app.use(cookieParser());
app.use(passport.initialize());
// app.use(morgan("dev"));

const corsOptions = {
  origin: [
    "http://localhost:3000",
    "https://cosmic-sherbet-41231e.netlify.app",
  ],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

// app.use((req, res, next) => {
//   console.log("request cookies ===>", req.cookies);
//   console.log("request headers ===>", req.headers);
//   next();
// });

app.use(routes);

// app.use("/", (req, res) => {
//   //   res.status(404).json({ error: "Page not found" });
//   res.render("404", {
//     layout: "404",
//   });
// });

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Laporan Masyarakat API",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};
const spacs = swaggerjsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(spacs));

app.use("*", (req, res, next) => {
  const endpoint = req.originalUrl;
  next(new ResponseError(404, `${endpoint} endpoint not found! `));
});
app.use(errorMiddleware);

module.exports = app;
