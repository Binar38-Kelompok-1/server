const express = require("express");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const passport = require("./middleware/auth/Passport");
const ErrorResponse = require("./middleware/ErrorResponse");
const ErrorMiddleware = require("./middleware/errorMiddleware");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

app.use((req, res, next) => {
     const endpoint = req.originalUrl;
     next(new ErrorResponse(404, `${endpoint} endpoint not found! `));
});

app.use(ErrorMiddleware);
module.exports = app;
