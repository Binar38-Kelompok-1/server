const db = require("../db/db");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

const JWT_SECRET = "JWT_SUPER_SECRET_CODE";
const JWT_EXPIRES_IN = "1d";

const createUserTest = async () => {
  const data = {
    nik: "1111222233334444",
    nama: "usertest1234",
    password: "usertest1234",
    no_telp: "6285444333222",
    alamat: "jalan test no 1234",
  };

  const hashedPassword = await bcrypt.hash(data.password, 10);
  const inputData = {
    nik: data.nik,
    nama: data.nama,
    password: hashedPassword,
    no_telp: data.no_telp,
    alamat: data.alamat,
  };

  await db("masyarakat").insert(inputData);
};

const getTestUser = async () => {
  const user = await db("masyarakat")
    .where({ nik: "1111222233334444" })
    .first();
  return user;
};

const deleteUserTest = async () => {
  await db("masyarakat").where({ nik: "1111222233334444" }).del();
};

const getUserToken = async () => {
  const user = await getTestUser();
  const token = JWT.sign(
    {
      id: user.id,
      role: "user",
    },
    JWT_SECRET,
    {
      expiresIn: JWT_EXPIRES_IN,
    }
  );
  return token;
};

const createAdminTest = async () => {
  const data = {
    username: "admin",
    nama: "admintest",
    password: "admin",
    no_telp: "6285444333222",
    alamat: "jalan test no 1234",
  };

  const hashedPassword = await bcrypt.hash(data.password, 10);
  const inputData = {
    username: data.username,
    nama: data.nama,
    password: hashedPassword,
    no_telp: data.no_telp,
    alamat: data.alamat,
  };
  await db("petugas").insert(inputData);
};

const getAdminTest = async () => {
  const admin = await db("petugas").where({ username: "admin" }).first();
  return admin;
};

const deleteAdminTest = async () => {
  await db("petugas").where({ username: "admin" }).del();
};

const getAdminToken = async () => {
  const admin = await getAdminTest();
  const token = JWT.sign(
    {
      id: admin.id,
      role: "admin",
    },
    JWT_SECRET,
    {
      expiresIn: JWT_EXPIRES_IN,
    }
  );
  return token;
};

const createLaporan = async () => {
  const user = await getTestUser();
  const dataLaporan = {
    isi_laporan: "test laporan",
    id_masyarakat: user.id,
    status: false,
    foto: "https://res.cloudinary.com/dr7nlkbkr/image/upload/v1705310819/Binar/xhn8qgsd9pq0sha2m1vk.jpg",
  };

  const laporan = await db("laporan")
    .where({ id_masyarakat: user.id })
    .insert(dataLaporan);
  return laporan;
};

const getLaporan = async () => {
  const user = await getTestUser();
  const laporan = await db("laporan").where({ id_masyarakat: user.id }).first();
  // console.log(laporan);
  return laporan;
};

const deleteLaporan = async () => {
  const user = await getTestUser();
  await db("laporan").where({ id_masyarakat: user.id }).del();
};

const createBalasan = async () => {
  const laporan = await getLaporan();
  const admin = await getAdminTest();
  const dataBalasan = {
    isi_balasan: "test balasan",
    id_laporan: laporan.id_laporan,
    id_petugas: admin.id,
  };
  await db("laporan")
    .where({ id_laporan: laporan.id_laporan })
    .update({ status: true });
  const balasan = await db("balasan").insert(dataBalasan);

  return balasan;
};

const getBalasan = async () => {
  const laporan = await getLaporan();
  const balasan = await db("balasan").where({ id_laporan: laporan.id }).first();
  return balasan;
};

const deleteBalasan = async () => {
  await db("balasan").where({ isi_balasan: "test balasan" }).del();
};

module.exports = {
  createUserTest,
  getTestUser,
  deleteUserTest,
  getUserToken,

  createAdminTest,
  getAdminTest,
  deleteAdminTest,
  getAdminToken,

  createLaporan,
  getLaporan,
  deleteLaporan,

  createBalasan,
  getBalasan,
  deleteBalasan,
};
