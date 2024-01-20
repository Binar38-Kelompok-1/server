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
    if (!findAdmin.length > 0) {
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

const profile = async (req, res, next) => {
  try {
    const data = {
      id: req.user.id,
    };

    const validData = validation(data, adminSchema.getAdmin);
    const findAdmin = await db("petugas")
      .where({ id: validData.id })
      .select(["id", "username", "nama", "no_telp", "alamat"]);

    if (!findAdmin.length > 0) {
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

const editProfileGet = async (req, res, next) => {
  try {
    const data = {
      id: req.user.id,
    };

    const validData = validation(data, adminSchema.getAdmin);
    const findAdmin = await db("petugas")
      .where({ id: validData.id })
      .select(["id", "username", "nama", "no_telp", "alamat"]);
    if (!findAdmin.length > 0) {
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

    if (!findAdmin.length > 0) {
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

    if (!findAdmin.length > 0) {
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

    const findAdmin = await db("petugas")
      .where({ id: validData.id })
      .select(["id", "username", "nama", "no_telp", "alamat"]);

    if (!findAdmin.length > 0) {
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
      .returning(["id", "username", "nama", "no_telp", "alamat"]);

    res.status(200).json({
      message: "success",
      data: result[0],
    });
  } catch (error) {
    next(error);
  }
};

const petugasList = async (req, res, next) => {
  try {
    const findAdmin = await db("petugas").select([
      "id",
      "username",
      "nama",
      "no_telp",
      "alamat",
    ]);

    if (!findAdmin.length > 0) {
      throw new ResponseError(404, "admin not found");
    }
    res.status(200).json({
      message: "success",
      findAdmin,
    });
  } catch (error) {
    next(error);
  }
};

const petugasRegisGet = async (req, res, next) => {
  try {
    const data = {
      id: req.user.id,
    };

    const validData = validation(data, adminSchema.getAdmin);

    const findAdmin = await db("petugas")
      .where({ id: validData.id })
      .select(["id", "username", "nama", "no_telp", "alamat"]);

    if (!findAdmin.length > 0) {
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

const petugasRegisPost = async (req, res, next) => {
  try {
    const data = {
      username: req.body.username,
      password: req.body.password,
      nama: req.body.nama,
      no_telp: req.body.no_telp,
      alamat: req.body.alamat,
    };

    const validData = validation(data, adminSchema.register);

    const findAdmin = await db("petugas")
      .where({ username: validData.username })
      .select(["id", "username", "nama", "no_telp", "alamat"]);

    if (findAdmin.length > 0) {
      throw new ResponseError(400, "username already exist");
    }

    const hashedPassword = await bcrypt.hash(validData.password, 10);

    const inputData = {
      id: validData.id,
      username: validData.username,
      password: hashedPassword,
      nama: validData.nama,
      no_telp: validData.no_telp,
      alamat: validData.alamat,
    };

    const result = await db("petugas")
      .insert(inputData)
      .returning(["id", "username", "nama", "no_telp", "alamat"]);

    res.status(201).json({
      message: "success",
      data: result[0],
    });
  } catch (error) {
    next(error);
  }
};

const petugasDetail = async (req, res, next) => {
  try {
    const data = {
      id: req.params.idPetugas,
    };

    const validData = validation(data, adminSchema.getAdmin);

    const findAdmin = await db("petugas")
      .where({ id: validData.id })
      .select(["id", "username", "nama", "no_telp", "alamat"]);
    if (!findAdmin.length > 0) {
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

module.exports = {
  homePage,
  profile,
  editProfileGet,
  editProfilePost,
  passwordGet,
  passwordPost,
  passwordPostNew,
  petugasList,
  petugasRegisGet,
  petugasRegisPost,
  petugasDetail,
  logout,
};
