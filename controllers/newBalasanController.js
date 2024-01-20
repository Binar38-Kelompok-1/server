const db = require("../db/db");
const ResponseError = require("../middleware/responseError");
const validation = require("../validation/validation");
const balasanSchema = require("../validation/balasanSchema");
const userSchema = require("../validation/userSchema");
const adminSchema = require("../validation/adminSchema");

const dashboard = async (req, res, next) => {
  try {
    const data = {
      id: req.user.id,
    };
    const validData = validation(data, balasanSchema.getBalasan);

    const semua = await db("laporan");
    const belum = await db("laporan").where({ status: false });
    const sudah = await db("laporan").where({ status: true });

    const findAdmin = await db("petugas")
      .where({ id: validData.id })
      .select(["id", "username", "nama", "no_telp", "alamat"]);

    if (!findAdmin.length > 0) {
      throw new ResponseError(404, "user not found");
    }

    res.status(200).json({
      message: "success",
      data: {
        semua,
        belum,
        sudah,
        findAdmin: findAdmin[0],
      },
    });
  } catch (error) {
    next(error);
  }
};

const masyarakatList = async (req, res, next) => {
  try {
    const data = {
      id: req.user.id,
    };

    const validData = validation(data, balasanSchema.getBalasan);

    const findAdmin = await db("petugas")
      .where({ id: validData.id })
      .select(["id", "username", "nama", "no_telp", "alamat"]);

    if (!findAdmin.length > 0) {
      throw new ResponseError(404, "user not found");
    }

    const result = await db("masyarakat")
      .orderBy("id", "asc")
      .select("id", "nik", "nama", "no_telp", "alamat");

    res.status(200).json({
      message: "success",
      data: {
        result,
        findAdmin: findAdmin[0],
      },
    });
  } catch (error) {
    next(error);
  }
};

const masyarakatDetail = async (req, res, next) => {
  try {
    const data = {
      id: req.user.id,
    };

    const validData = validation(data, balasanSchema.getBalasan);

    const findAdmin = await db("petugas")
      .where({ id: validData.id })
      .select(["id", "username", "nama", "no_telp", "alamat"]);

    if (!findAdmin.length > 0) {
      throw new ResponseError(404, "user not found");
    }

    const result = await db("masyarakat")
      .where({ id: req.params.idMasyarakat })
      .select("id", "nik", "nama", "no_telp", "alamat");

    if (!result.length > 0) {
      throw new ResponseError(404, "user not found");
    }

    res.status(200).json({
      message: "success",
      data: {
        result,
        findAdmin: findAdmin[0],
      },
    });
  } catch (error) {
    next(error);
  }
};

const masyarakatEditGet = async (req, res, next) => {
  try {
    const data = {
      id: req.user.id,
    };

    const validData = validation(data, balasanSchema.getBalasan);

    const findAdmin = await db("petugas")
      .where({ id: validData.id })
      .select(["id", "username", "nama", "no_telp", "alamat"]);

    if (!findAdmin.length > 0) {
      throw new ResponseError(404, "user not found");
    }

    const result = await db("masyarakat")
      .where({ id: req.params.idMasyarakat })
      .select("id", "nik", "nama", "no_telp", "alamat");

    if (!result.length > 0) {
      throw new ResponseError(404, "user not found");
    }

    res.status(200).json({
      message: "success",
      data: {
        result,
        findAdmin: findAdmin[0],
      },
    });
  } catch (error) {
    next(error);
  }
};

const masyarakatEditPost = async (req, res, next) => {
  try {
    // Extract data from the request body
    const data = {
      nama: req.body.nama,
      no_telp: req.body.no_telp,
      alamat: req.body.alamat,
    };

    // Validate the extracted data using your validation function
    const validData = validation(data, userSchema.editUser);

    // Find the admin based on the user ID from the request
    const findAdmin = await db("petugas")
      .where({ id: req.user.id })
      .select(["id", "username", "nama", "no_telp", "alamat"]);

    // Check if the admin is found
    if (!findAdmin.length > 0) {
      // If not found, throw a 404 error
      throw new ResponseError(404, "User not found");
    }

    // Log the validated data for debugging

    const result = await db("masyarakat")
      .where({ id: req.params.idMasyarakat })
      .update(validData)
      .returning(["id", "nik", "nama", "no_telp", "alamat"]);

    if (!result.length > 0) {
      throw new ResponseError(404, "user not found");
    }

    res.status(200).json({
      message: "success",
      data: {
        result,
        findAdmin: findAdmin[0],
      },
    });
  } catch (error) {
    next(error);
  }
};

const masyarakatDelete = async (req, res, next) => {
  try {
    const data = {
      id: req.user.id,
    };

    const validData = validation(data, balasanSchema.getBalasan);

    const findAdmin = await db("petugas")
      .where({ id: validData.id })
      .select(["id", "username", "nama", "no_telp", "alamat"]);

    if (!findAdmin.length > 0) {
      throw new ResponseError(404, "user not found");
    }

    const findUser = await db("masyarakat")
      .where({ id: req.params.idMasyarakat })
      .select(["id", "nik", "nama", "no_telp", "alamat"]);

    if (!findUser.length > 0) {
      throw new ResponseError(404, "user not found");
    }

    const result = await db("masyarakat")
      .where({ id: req.params.idMasyarakat })
      .del();

    res.status(200).json({
      message: "success",
      data: {
        findUser: findUser[0],
        findAdmin: findAdmin[0],
      },
    });
  } catch (error) {
    next(error);
  }
};

const riwayat = async (req, res, next) => {
  try {
    const data = {
      id: req.user.id,
    };
    const validData = validation(data, adminSchema.getAdmin);

    const balasan = await db("balasan")
      .join("laporan", "laporan.id_laporan", "=", "balasan.id_laporan")
      .join("masyarakat", "masyarakat.id", "=", "laporan.id_masyarakat")
      .where({ id_petugas: validData.id });

    const findAdmin = await db("petugas")
      .where({ id: validData.id })
      .select(["id", "username", "nama", "no_telp", "alamat"]);

    if (!findAdmin.length > 0) {
      throw new ResponseError(404, "admin not found");
    }

    res.status(200).json({
      message: "success",
      balasan,
      nama: findAdmin[0],
    });
  } catch (error) {
    next(error);
  }
};

const riwayatDetail = async (req, res, next) => {
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

    const balasan = await db("balasan")
      .join("laporan", "laporan.id_laporan", "=", "balasan.id_laporan")
      .join("masyarakat", "masyarakat.id", "=", "laporan.id_masyarakat")
      .where({ id_balasan: req.params.idBalasan });

    res.status(200).json({
      message: "success",
      balasan,
      nama: findAdmin[0],
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  dashboard,
  masyarakatList,
  masyarakatDetail,
  masyarakatEditGet,
  masyarakatEditPost,
  masyarakatDelete,
  riwayat,
  riwayatDetail,
};
