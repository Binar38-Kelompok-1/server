const db = require("../db/db");
const bcrypt = require("bcrypt");
const ResponseError = require("../middleware/responseError");
const validation = require("../validation/validation");
const userSchema = require("../validation/userSchema");

const getUser = async (req, res, next) => {
  try {
    console.log(req.cookies);
    const data = {
      id: req.user.id,
    };
    const validData = validation(data, userSchema.getUser);
    const findUser = await db("masyarakat").where({ id: validData.id });
    if (!findUser) {
      throw new ResponseError(404, "user not found");
    }

    const result = {
      id: findUser[0].id,
      nik: findUser[0].nik,
      nama: findUser[0].nama,
      no_telp: findUser[0].no_telp,
      alamat: findUser[0].alamat,
    };
    res.status(200).json({
      message: "success",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const postUser = async (req, res, next) => {
  try {
    const data = {
      id: req.user.id,
      nik: req.body.nik,
      nama: req.body.nama,
      no_telp: req.body.no_telp,
      alamat: req.body.alamat,
    };
    const validData = validation(data, userSchema.postUser);
    const findNik = await db("masyarakat").where({ nik: validData.nik });
    const findNoTelp = await db("masyarakat").where({
      no_telp: validData.no_telp,
    });

    if (!findNik.length > 0) {
      throw new ResponseError(400, "nik already exist");
    }

    if (!findNoTelp.length > 0) {
      throw new ResponseError(400, "no_telp already exist");
    }

    const inputData = {
      id: validData.id,
      nik: validData.nik,
      nama: validData.nama,
      no_telp: validData.no_telp,
      alamat: validData.alamat,
      updated_at: new Date(),
    };

    const result = await db("masyarakat")
      .update(inputData)
      .where({ id: validData.id })
      .returning(["id", "nik", "nama", "no_telp", "alamat"]);

    res.status(200).json({
      message: "success",
      data: result[0],
    });
  } catch (error) {
    next(error);
  }
};

const getPassword = async (req, res, next) => {
  try {
    const data = {
      id: req.user.id,
    };
    const validData = validation(data, userSchema.getUser);
    const findUser = await db("masyarakat")
      .where({ id: validData.id })
      .select("nama");

    if (!findUser) {
      throw new ResponseError(404, "user not found");
    }
    const result = {
      nama: findUser[0].nama,
    };
    res.status(200).json({
      message: "success",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const postPassword = async (req, res, next) => {
  try {
    const data = {
      id: req.user.id,
      password: req.body.password,
    };
    const validData = validation(data, userSchema.postPassword);

    const findUser = await db("masyarakat").where({
      id: validData.id,
    });

    const isPasswordCorrect = await bcrypt.compare(
      validData.password,
      findUser[0].password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Password salah",
      });
    }
    res.status(200).json({
      message: "success",
      data: findUser[0].nama,
    });
  } catch (error) {
    next(error);
  }
};

const postNewPassword = async (req, res, next) => {
  try {
    const data = {
      id: req.user.id,
      password: req.body.password,
    };
    const validData = validation(data, userSchema.postPassword);
    const oldPassword = await db("masyarakat")
      .where({ id: validData.id })
      .select("password");

    const passCheck = await bcrypt.compare(
      validData.password,
      oldPassword[0].password
    );

    if (passCheck) {
      throw new ResponseError(400, "password tidak boleh sama");
    }

    const hashedPassword = await bcrypt.hash(validData.password, 10);

    const inputData = {
      id: validData.id,
      password: hashedPassword,
    };
    const result = await db("masyarakat")
      .update(inputData)
      .where({ id: validData.id })
      .returning(["id"]);

    res.status(200).json({
      message: "success",
      data: result[0],
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUser,
  postUser,
  getPassword,
  postPassword,
  postNewPassword,
};
