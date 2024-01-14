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
    },
    JWT_SECRET,
    {
      expiresIn: JWT_EXPIRES_IN,
    }
  );
  return token;
};

module.exports = { createUserTest, deleteUserTest, getTestUser, getUserToken };
