const db = require("../db/db");
const bcrypt = require("bcrypt");
const ResponseError = require("../middleware/responseError");
const validation = require("../validation/validation");
const userSchema = require("../validation/userSchema");

const getUser = async (req, res, next) => {
  try {
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

module.exports = { getUser };
