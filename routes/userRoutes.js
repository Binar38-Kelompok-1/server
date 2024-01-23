const express = require("express");
const route = express.Router();
const userAuth = require("../controllers/userAuth");
const newUserController = require("../controllers/newUserControler");
const newLaporanController = require("../controllers/newLaporanController");

const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

const auth = require("../authentication/auth");

cloudinary.config({
  cloud_name: "dr7nlkbkr",
  api_key: "661614743312731",
  api_secret: "p2OilPILzo9E3DgurZid5yK-uXw",
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "Binar",
    allowedFormats: ["jpeg", "png", "jpg"],
  },
});

const upload = multer({ storage: storage });

// route.get("/", UserController.homePage);

// route.get("/profil", UserController.profil);
// route.get("/profil/edit", UserController.profilEditGet);
// route.post("/profil/edit", UserController.profilEditPost);

// route.get("/profil/password", UserController.passwordGet);
// route.post("/profil/password", UserController.passwordPost);
// route.post("/profil/password/baru", UserController.passwordPostNew);

// route.get("/lapor", UserController.laporGet);
// route.post("/lapor", upload.single("foto"), UserController.laporPost);

// route.get("/riwayat", UserController.riwayat);
// route.get("/riwayat/:idLap", UserController.riwayatDetail);

// route.get("/logout", UserController.logout);

// new USER route
/**
 * @swagger
 * /user/:
 *   get:
 *     summary: Get user details
 *     description: Retrieve details of the authenticated user
 *     tags: [User]
 *     security:
 *       - JWTAuth: []
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             example:
 *               message: "success"
 *               data:
 *                 id: 1
 *                 nik: "1234567890123666"
 *                 nama: "test"
 *                 no_telp: "081234567999"
 *                 alamat: "jalan test no 1234"
 *       '401':
 *         description: Unauthorized, invalid or expired token
 *         content:
 *           application/json:
 *             example:
 *               message: "Unauthorized"
 *       '404':
 *         description: User not found
 *         content:
 *           application/json:
 *             example:
 *               message: "user not found"
 */
route.get("/", newUserController.getUser);

route.get("/profil", newUserController.getUser);

route.get("/profil/edit", newUserController.getUser);
/**
 * @swagger
 * /user/profil/edit:
 *   post:
 *     summary: Edit user profile
 *     description: Edit the profile details of the authenticated user
 *     tags: [User]
 *     security:
 *       - JWTAuth: []
 *     parameters:
 *       - in: header
 *         name: authorization
 *         description: jwt token
 *         required: true
 *         schema:
 *           type: string
 *           format: "{token}"
 *     requestBody:
 *       description: User profile details to be edited
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
 *               no_telp:
 *                 type: string
 *                 description: User's phone number
 *               alamat:
 *                 type: string
 *                 description: User's address
 *             example:
 *               nik: "1234567890123666"
 *               nama: "test"
 *               no_telp: "081234567999"
 *               alamat: "jalan test no 1234"
 *     responses:
 *       '200':
 *         description: Successful profile edit
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
 *         description: Bad request, NIK or no_telp already exist
 *         content:
 *           application/json:
 *             examples:
 *               nikExists:
 *                 value:
 *                   message: "nik already exist"
 *               noTelpExists:
 *                 value:
 *                   message: "no_telp already exist"
 *       '401':
 *         description: Unauthorized, invalid or expired token
 *         content:
 *           application/json:
 *             example:
 *               message: "Unauthorized"
 */

route.post("/profil/edit", auth.isUser, newUserController.postUser);

/**
 * @swagger
 * /user/profil/password:
 *   get:
 *     summary: Get user's password
 *     description: Retrieve the user's password (for demonstration purposes only)
 *     tags: [User]
 *     security:
 *       - JWTAuth: []
 *     parameters:
 *       - in: header
 *         name: authorization
 *         description: jwt token
 *         required: true
 *         schema:
 *           type: string
 *           format: "{token}"
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             example:
 *               message: "success"
 *               data:
 *                 nama: "John Doe"
 *       '401':
 *         description: Unauthorized, invalid or expired token
 *         content:
 *           application/json:
 *             example:
 *               message: "Unauthorized"
 *       '404':
 *         description: User not found
 *         content:
 *           application/json:
 *             example:
 *               message: "user not found"
 */
route.get("/profil/password", auth.isUser, newUserController.getPassword);
route.post("/profil/password", auth.isUser, newUserController.postPassword);
route.post(
  "/profil/password/baru",
  auth.isUser,
  newUserController.postNewPassword
);
// new Lapor route
/**
 * @swagger
 * /user/lapor:
 *   get:
 *     summary: Get user's report
 *     description: Retrieve reports submitted by the authenticated user
 *     tags: [User]
 *     security:
 *       - JWTAuth: []
 *     parameters:
 *       - in: header
 *         name: authorization
 *         description: jwt token
 *         required: true
 *         schema:
 *           type: string
 *           format: "{token}"
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             example:
 *               message: "success"
 *               data:
 *                 nama: "John Doe"
 *       '401':
 *         description: Unauthorized, invalid or expired token
 *         content:
 *           application/json:
 *             example:
 *               message: "Unauthorized"
 *       '404':
 *         description: User not found
 *         content:
 *           application/json:
 *             example:
 *               message: "user not found"
 */
route.get("/lapor", auth.isUser, newLaporanController.getLaporan);
route.post(
  "/lapor",
  auth.isUser,
  upload.single("foto"),
  newLaporanController.createLaporan
);
route.get("/riwayat", auth.isUser, newLaporanController.riwayat);
route.get("/riwayat/:idLap", auth.isUser, newLaporanController.riwayatDetail);
route.get("/logout", auth.isUser, userAuth.logout);

module.exports = route;
