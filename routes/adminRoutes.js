const express = require("express");
const route = express.Router();
const AdminController = require("../controllers/AdminController");
const auth = require("../authentication/auth");
const newAdminController = require("../controllers/newAdminController");

// route.get("/", AdminController.homePage);

// route.get("/profil", AdminController.profile);
// route.get("/profil/edit", AdminController.editProfileGet);
// route.post("/profil/edit", AdminController.editProfilePost);
// route.get("/profil/password", AdminController.passwordGet);
// route.post("/profil/password", AdminController.passwordPost);
// route.post("/profil/password/baru", AdminController.passwordPostNew);

// route.get("/dasbor", AdminController.dashboard);

route.get("/masyarakat", AdminController.masyarakatList);
route.get("/masyarakat/:idMasyarakat", AdminController.masyarakatDetail);
route.get("/masyarakat/:idMasyarakat/edit", AdminController.masyarakatEditGet);
route.post(
  "/masyarakat/:idMasyarakat/edit",
  AdminController.masyarakatEditPost
);
route.get("/masyarakat/:idMasyarakat/delete", AdminController.masyarakatDelete);

route.get("/petugas", AdminController.petugasList);
route.get("/petugas/tambah", AdminController.petugasRegisGet);
route.post("/petugas/tambah", AdminController.petugasRegisPost);
route.get("/petugas/:idPetugas", AdminController.petugasDetail);

route.get("/laporan", AdminController.belumBalas);
route.get("/laporan/:idLap", AdminController.belumBalasDetail);
route.post("/laporan/:idLap", AdminController.balas);
route.get("/laporan/:idLap/delete", AdminController.hapusLaporan);

route.get("/selesai", AdminController.sudahBalas);
route.get("/selesai/:idLap", AdminController.sudahBalasDetail);

route.get("/riwayat", AdminController.riwayat);
route.get("/riwayat/:idBalasan", AdminController.riwayatDetail);

route.get("/logout", AdminController.logout);

// new ADMIN route
route.get("/", auth.isAdmin, newAdminController.homePage);
route.get("/profil", auth.isAdmin, newAdminController.profile);
route.get("/profil/edit", auth.isAdmin, newAdminController.editProfileGet);
route.post("/profil/edit", auth.isAdmin, newAdminController.editProfilePost);
route.get("/profil/password", auth.isAdmin, newAdminController.passwordGet);
route.post("/profil/password", auth.isAdmin, newAdminController.passwordPost);
route.post(
  "/profil/password/baru",
  auth.isAdmin,
  newAdminController.passwordPostNew
);
//  new BALASAN route
route.get("/dasbor", AdminController.dashboard);

module.exports = route;
