const express = require("express");
const route = express.Router();
const UserController = require("../controllers/UserController");
const newUserController = require("../controllers/newUserControler");
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
route.post("/profil/password/baru", UserController.passwordPostNew);

route.get("/lapor", UserController.laporGet);
route.post("/lapor", upload.single("foto"), UserController.laporPost);

route.get("/riwayat", UserController.riwayat);
route.get("/riwayat/:idLap", UserController.riwayatDetail);

route.get("/logout", UserController.logout);

// new USER route
route.get("/", newUserController.getUser);
route.get("/profil", newUserController.getUser);
route.get("/profil/edit", newUserController.getUser);
route.post("/profil/edit", auth.isUser, newUserController.postUser);
route.get("/profil/password", auth.isUser, newUserController.getPassword);
route.post("profil/password", auth.isUser, newUserController.postPassword);

module.exports = route;
