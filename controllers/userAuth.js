const db = require("../db/db");
const bcrypt = require("bcrypt");
const ResponseError = require("../middleware/responseError");
const validation = require("../validation/validation");
const userSchema = require("../validation/userSchema");
const JWT = require("jsonwebtoken");

const JWT_SECRET = "JWT_SUPER_SECRET_CODE";
const JWT_EXPIRES_IN = "1d";

const register = async (req, res, next) => {
  try {
    //  ambil data dari request body
    const data = {
      nik: req.body.nik,
      nama: req.body.nama,
      password: req.body.password,
      no_telp: req.body.no_telp,
      alamat: req.body.alamat,
    };
    // melakukan validasi data menggunakan joi userSchema register
    const validData = validation(data, userSchema.register);
    console.log(validData);
    //  validasi nik apakah sudah ada di database atau belum
    const findNik = await db("masyarakat").where({ nik: validData.nik });
    if (findNik.length > 0) {
      // jika error akan dilempar ke response error dengan
      // status code dan pesan errornya
      throw new ResponseError(400, "NIK sudah terdaftar");
    }

    // melakukan hashing password dengan bcrypt untuk keamanan data
    const hashedPassword = await bcrypt.hash(validData.password, 10);
    // membuat data input, dan mengganti password dengan password yang sudah di hash
    const inputData = {
      nik: validData.nik,
      nama: validData.nama,
      password: hashedPassword,
      no_telp: validData.no_telp,
      alamat: validData.alamat,
    };

    // memasukan data input ke database dengan tabel masyarakat,
    //  dan mengembalikan id, nik, nama, no_telp, alamat
    const result = await db("masyarakat")
      .insert(inputData)
      .returning(["id", "nik", "nama", "no_telp", "alamat"]);

    // memformat data yang dikembalikan agar number tetap number

    // mengirim hasil ke response
    res.status(201).json({
      message: "success",
      data: result[0],
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    //  ambil data dari request body
    const data = {
      nik: req.body.nik,
      password: req.body.password,
    };

    // melakukan validasi data menggunakan joi userSchema login
    const validData = validation(data, userSchema.login);
    //  validasi nik apakah sudah ada di database atau belum
    const findNik = await db("masyarakat").where({ nik: validData.nik });
    //  validasi nik apakah sudah ada di database atau belum
    //  jika tidak ada, maka akan dilempar ke error
    if (!findNik.length > 0) {
      // jika error akan dilempar ke response error dengan
      // status code dan pesan errornya
      throw new ResponseError(401, "NIK atau Password Salah");
    }
    //  validasi password dengan membandingkan password dari request body
    // dengan password yang sudah di hash di database
    const validPassword = await bcrypt.compare(
      validData.password,
      findNik[0].password
    );
    // jika password tidak sesuai, maka akan dilempar ke error
    if (!validPassword) {
      throw new ResponseError(401, "NIK atau Password Salah");
    }

    // jika password sesuai, maka akan membuat token
    // token menggunakan jsonwebtoken
    // payload token adalah id, role="user", dan expired="1d" 1 hari
    const token = JWT.sign(
      {
        id: findNik[0].id,
        role: "user",
      },
      JWT_SECRET,
      {
        expiresIn: JWT_EXPIRES_IN,
      }
    );

    // mengirim token ke response
    // token di kirim ke cookie dengan nama autorization ="token"
    res
      .status(200)
      .cookie("authorization", token, {
        httpOnly: true,
        secure: true,
      })
      .json({
        message: "success",
        token,
      });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    const token = null;
    res
      .status(200)
      .cookie("authorization", token, {
        httpOnly: true,
        secure: true,
      })
      .json({
        message: "success",
        token,
      });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login, logout };
