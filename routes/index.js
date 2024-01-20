const express = require("express");
const route = express.Router();
const adminRoute = require("./adminRoutes");
const userRoute = require("./userRoutes");
// new migration to api
const homePage = require("../controllers/homepage");
const userAuth = require("../controllers/userAuth");
const adminAuth = require("../controllers/adminAuth");

// use auth passport-jwt
const auth = require("../authentication/auth");
//  USER
// route.get("/", Controller.isLoggedOut, Controller.homePage);
// route.post("/", Controller.login);
// route.get("/register", Controller.isLoggedOut, Controller.registerGet);
// route.post("/register", Controller.registerPost);

// route.use("/user", Controller.isLoggedInUser, userRoute);

// PETUGAS
// route.get("/login-petugas", Controller.isLoggedOut, Controller.loginPetugasGet);
// route.post("/login-petugas", Controller.loginPetugasPost);
// route.use("/admin", Controller.isLoggedInAdmin, adminRoute);

// new homepage
route.get("/", homePage.homePage);

// new USER auth
// register
route.post("/register", userAuth.register);
// login
route.post("/", userAuth.login);
// userRoute
route.use("/user", auth.authenticate, userRoute);

// new PETUGAS auth
route.get("/login-petugas", homePage.loginPage);
route.post("/login-petugas", adminAuth.login);

route.use("/admin", auth.authenticate, adminRoute);

module.exports = route;
