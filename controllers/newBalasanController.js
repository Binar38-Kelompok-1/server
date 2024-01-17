const db = require("../db/db");
const ResponseError = require("../middleware/responseError");
const validation = require("../validation/validation");
const balasanSchema = require("../validation/balasanSchema");

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
      .where({ id: req.user.id })
      .select(["nama"]);
    if (!findAdmin) {
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
    const findAdmin = await db("petugas")
      .where({ id: req.user.id })
      .select(["nama"]);
    const data = await db("masyarakat")
      .orderBy("id", "asc")
      .select("id", "nik", "nama", "no_telp", "alamat");
    res.status(200).json({
      message: "success",
      data,
      findAdmin: findAdmin[0],
    });
  } catch (error) {
    next(error);
  }
};

const masyarakatDetail = async (req, res, next) => {
  try {
    const findAdmin = await db("petugas")
      .where({ id: req.user.id })
      .select(["nama"]);
    const data = await db("masyarakat")
      .where({ id: req.params.idMasyarakat })
      .select("id", "nik", "nama", "no_telp", "alamat");
    res.status(200).json({
      message: "success",
      data,
      findAdmin: findAdmin[0],
    });
  } catch (error) {
    next(error);
  }
};

const masyarakatEditGet = async (req, res, next) => {
  try {
    const findAdmin = await db("petugas")
      .where({ id: req.user.id })
      .select(["nama"]);
    const data = await db("masyarakat")
      .where({ id: req.params.idMasyarakat })
      .select("id", "nik", "nama", "no_telp", "alamat");
    res.status(200).json({
      message: "success",
      data,
      findAdmin: findAdmin[0],
    });
  } catch (error) {
    next(error);
  }
};

const masyarakatEditPost = async (req, res, next) => {
  try {
    const data = {
      nik: req.body.nik,
      nama: req.body.nama,
      no_telp: req.body.no_telp,
      alamat: req.body.alamat,
    };
    const findAdmin = await db("petugas")
      .where({ id: req.user.id })
      .select(["nama"]);
    if (!findAdmin) {
      throw new ResponseError(404, "user not found");
    }

    const result = await db("masyarakat")
      .where({ id: req.params.idMasyarakat })
      .update(data)
      .returning(["id", "nik", "nama", "no_telp", "alamat"]);

    res.status(200).json({
      message: "success",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const masyarakatDelete = async (req, res, next) => {
  try {
    const findAdmin = await db("petugas")
      .where({ id: req.user.id })
      .select(["nama"]);
    if (!findAdmin) {
      throw new ResponseError(404, "user not found");
    }

    const findUser = await db("masyarakat")
      .where({ id: req.params.idMasyarakat })
      .select(["id", "nik", "nama", "no_telp", "alamat"]);

    if (!findUser) {
      throw new ResponseError(404, "user not found");
    }

    const result = await db("masyarakat")
      .where({ id: req.params.idMasyarakat })
      .del();

    res.status(200).json({
      message: "success",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const riwayat = async (req, res, next) => {
  try {
    const data = await db("balasan")
      .join("laporan", "laporan.id_laporan", "=", "balasan.id_laporan")
      .join("masyarakat", "masyarakat.id", "=", "laporan.id_masyarakat")
      .where({ id_petugas: req.user.id });
    const nama = await db("petugas").where({ id: req.user.id }).select("nama");

    res.status(200).json({
      message: "success",
      data,
      nama: nama[0].nama,
    });
  } catch (error) {
    next(error);
  }
};

const riwayatDetail = async (req, res, next) => {
  try {
    const data = await db("balasan")
      .join("laporan", "laporan.id_laporan", "=", "balasan.id_laporan")
      .join("masyarakat", "masyarakat.id", "=", "laporan.id_masyarakat")
      .where({ id_balasan: req.params.idBalasan });
    const dataAdmin = await db("petugas")
      .where({ id: req.user.id })
      .select("nama", "alamat", "no_telp");

    res.status(200).json({
      message: "success",
      data,
      dataAdmin,
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
