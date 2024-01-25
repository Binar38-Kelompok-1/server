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

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication APIs
 */

// new homepage
route.get("/", homePage.homePage);

// new USER auth
// register
/**
 * @swagger
 * /register:
 *   post:
 *     summary: User registration
 *     description: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       description: User registration details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nik:
 *                 type: string
 *                 description: User's NIK (National Identification Number)
 *               nama:
 *                 type: string
 *                 description: User's name
 *               password:
 *                 type: string
 *                 description: User's password
 *               no_telp:
 *                 type: string
 *                 description: User's phone number
 *               alamat:
 *                 type: string
 *                 description: User's address
 *             example:
 *               nik: "1234567890123666"
 *               nama: "test"
 *               password: "passworduserbaru"
 *               no_telp: "081234567999"
 *               alamat: "jalan test no 1234"
 *     responses:
 *       '201':
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             example:
 *               message: success
 *               data:
 *                 id: 1
 *                 nik: "1234567890123666"
 *                 nama: "test"
 *                 no_telp: "081234567999"
 *                 alamat: "jalan test no 1234"
 *       '400':
 *         description: Bad request, NIK already registered
 *         content:
 *           application/json:
 *             example:
 *               message: "NIK sudah terdaftar"
 */

route.post("/register", userAuth.register);
// login
/**
 * @swagger
 * /:
 *   post:
 *     summary: User login
 *     description: Authenticate user with NIK (National Identification Number) and password
 *     tags: [Authentication]
 *     requestBody:
 *       description: User login credentials
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nik:
 *                 type: string
 *                 description: User's NIK (National Identification Number)
 *               password:
 *                 type: string
 *                 description: User's password
 *             example:
 *               nik: "1234567890123466"
 *               password: "passworduserbaru"
 *     responses:
 *       '200':
 *         description: Successful login
 *         content:
 *           application/json:
 *             example:
 *               message: success
 *               token: "your_jwt_token_here"
 *       '401':
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example:
 *               message: "NIK or Password is incorrect"
 */

route.post("/", userAuth.login);
// userRoute
route.use("/user", auth.authenticate, userRoute);

// new PETUGAS auth
/**
 * @swagger
 * /login-petugas:
 *   get:
 *     summary: Get login page for staff
 *     description: Retrieve the login page for staff (petugas)
 *     tags: [Authentication]
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             example:
 *               message: "success"
 */

route.get("/login-petugas", homePage.loginPage);

/**
 * @swagger
 * /login-petugas:
 *   post:
 *     summary: Admin login
 *     description: Authenticate admin with username and password
 *     tags: [Authentication]
 *     requestBody:
 *       description: Admin login credentials
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Admin's username
 *               password:
 *                 type: string
 *                 description: Admin's password
 *             example:
 *               username: "bintang"
 *               password: "bintang"
 *     responses:
 *       '200':
 *         description: Successful login
 *         content:
 *           application/json:
 *             example:
 *               message: "success"
 *               token: "your_jwt_token_here"
 *       '401':
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example:
 *               message: "username atau Password Salah"
 */

route.post("/login-petugas", adminAuth.login);

route.use("/testing", (req, res) => {
  res.send("test action");
});

route.use("/admin", auth.authenticate, adminRoute);

module.exports = route;
