const db = require("../db/db");
const bcrypt = require("bcrypt");
const ResponseError = require("../middleware/responseError");
const validation = require("../validation/validation");
const adminSchema = require("../validation/adminSchema");

const homePage = async (req, res, next) => {
  try {
    const data = {
      id: req.user.id,
    };

    const validData = validation(data, adminSchema.getAdmin);
    const findAdmin = await db("petugas").where({ id: validData.id });
    if (!findAdmin) {
      throw new ResponseError(404, "admin not found");
    }

    res.status(200).json({
      message: "success",
      data: findAdmin[0].nama,
    });
  } catch (error) {
    next(error);
  }
};

const profile = async (req, res, next) => {
  try {
    const data = {
      id: req.user.id,
    };

    const validData = validation(data, adminSchema.getAdmin);
    const findAdmin = await db("petugas")
      .where({ id: validData.id })
      .select(["id", "username", "nama", "no_telp", "alamat"]);
    if (!findAdmin) {
      throw new ResponseError(404, "admin not found");
    }

    res.status(200).json({
      message: "success",
      data: findAdmin,
    });
  } catch (error) {
    next(error);
  }
};

const editProfileGet = async (req, res, next) => {
  try {
    const data = {
      id: req.user.id,
    };

    const validData = validation(data, adminSchema.getAdmin);
    const findAdmin = await db("petugas")
      .where({ id: validData.id })
      .select(["id", "username", "nama", "no_telp", "alamat"]);
    if (!findAdmin) {
      throw new ResponseError(404, "admin not found");
    }

    res.status(200).json({
      message: "success",
      data: findAdmin,
    });
  } catch (error) {
    next(error);
  }
};

const editProfilePost = async (req, res, next) => {
  try {
    const data = {
      id: req.user.id,
      username: req.body.username,
      nama: req.body.nama,
      no_telp: req.body.no_telp,
      alamat: req.body.alamat,
    };

    const validData = validation(data, adminSchema.update);
    const findAdmin = await db("petugas")
      .where({ id: validData.id })
      .select(["id", "username", "nama", "no_telp", "alamat"]);
    if (!findAdmin) {
      throw new ResponseError(404, "admin not found");
    }
    const findNoTelp = await db("petugas").where({
      no_telp: validData.no_telp,
    });
    if (findNoTelp.length > 0) {
      throw new ResponseError(400, "no_telp already exist");
    }
    const inputData = {
      id: validData.id,
      username: validData.username,
      nama: validData.nama,
      no_telp: validData.no_telp,
      alamat: validData.alamat,
      updated_at: new Date(),
    };

    const result = await db("petugas")
      .update(inputData)
      .where({ id: validData.id })
      .returning(["id", "username", "nama", "no_telp", "alamat"]);

    res.status(200).json({
      message: "success",
      data: result[0],
    });
  } catch (error) {
    next(error);
  }
};

const passwordGet = async (req, res, next) => {
  try {
    const data = {
      id: req.user.id,
    };

    const validData = validation(data, adminSchema.getAdmin);
    const findAdmin = await db("petugas")
      .where({ id: validData.id })
      .select(["id", "username", "nama", "no_telp", "alamat"]);

    if (!findAdmin) {
      throw new ResponseError(404, "admin not found");
    }

    res.status(200).json({
      message: "success",
      data: findAdmin[0],
    });
  } catch (error) {
    next(error);
  }
};

const passwordPost = async (req, res, next) => {
  try {
    const data = {
      id: req.user.id,
      password: req.body.password,
    };
    const validData = validation(data, adminSchema.passwordPost);
    console.log(validData);
    const findAdmin = await db("petugas").where({ id: validData.id });
    res.status(200).json({
      message: "success",
      data: findAdmin[0].nama,
    });
  } catch (error) {
    next(error);
  }
};

const passwordPostNew = async (req, res, next) => {
  try {
    const data = {
      id: req.user.id,
      password: req.body.password,
    };
    const validData = validation(data, adminSchema.passwordPost);
    const oldPassword = await db("petugas")
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
    const result = await db("petugas")
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
  homePage,
  profile,
  editProfileGet,
  editProfilePost,
  passwordGet,
  passwordPost,
  passwordPostNew,
};
