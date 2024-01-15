const db = require("../db/db");
const ResponseError = require("../middleware/responseError");
const validation = require("../validation/validation");
const laporanSchema = require("../validation/laporanSchema");

const getLaporan = async (req, res, next) => {
  try {
    const data = {
      id_masyarakat: req.user.id,
    };

    const validData = validation(data, laporanSchema.getLaporan);
    const findUser = await db("masyarakat")
      .where({
        id: validData.id_masyarakat,
      })
      .select(["nama"]);

    if (!findUser) {
      throw new ResponseError(404, "user not found");
    }

    res.status(200).json({
      message: "success",
      data: {
        nama: findUser[0].nama,
      },
    });
  } catch (error) {
    next(error);
  }
};

const createLaporan = async (req, res, next) => {
  try {
    const data = {
      isi_laporan: req.body.isi_laporan,
      id_masyarakat: req.user.id,
      status: false,
    };
    const foto = req.file;
    if (foto) {
      {
        data.foto = foto.path;
      }
    }

    const validData = validation(data, laporanSchema.createLaporan);

    const findUser = await db("masyarakat").where({
      id: validData.id_masyarakat,
    });

    if (!findUser) {
      throw new ResponseError(404, "user not found");
    }

    const result = await db("laporan").insert(validData).returning("*");

    res.status(201).json({
      message: "success",
      data: result[0],
    });
  } catch (error) {
    next(error);
  }
};

const riwayat = async (req, res, next) => {
  try {
    const data = {
      id_masyarakat: req.user.id,
    };

    const validData = validation(data, laporanSchema.getLaporan);

    const findUser = await db("masyarakat").where({
      id: validData.id_masyarakat,
    });
    if (!findUser) {
      throw new ResponseError(404, "user not found");
    }

    const findLaporan = await db("laporan").where({
      id_masyarakat: validData.id_masyarakat,
    });
    if (!findLaporan) {
      throw new ResponseError(404, "laporan not found");
    }

    res.status(200).json({
      message: "success",
      nama: findUser[0].nama,
      data: findLaporan,
    });
  } catch (error) {
    next(error);
  }
};

const riwayatDetail = async (req, res, next) => {
  try {
    const data = {
      id_masyarakat: req.user.id,
      id_laporan: parseInt(req.params.idLap),
    };
    const validData = validation(data, laporanSchema.riwayatDetail);
    console.log(validData);
    const findUser = await db("masyarakat").where({
      id: validData.id_masyarakat,
    });
    if (!findUser) {
      throw new ResponseError(404, "user not found");
    }

    const findLaporan = await db("laporan").where({
      id_masyarakat: validData.id_masyarakat,
      id_laporan: validData.id_laporan,
    });

    if (!findLaporan) {
      throw new ResponseError(404, "laporan not found");
    }

    // seeder sementara
    // await db("balasan").insert({
    //   isi_balasan: "test isi balasan",
    //   id_laporan: validData.id_laporan,
    //   id_petugas: 1,
    // });

    const findBalasan = await db("balasan").where({
      id_laporan: validData.id_laporan,
    });
    const findAdmin = await db("petugas").where({
      id: findBalasan[0].id_petugas,
    });

    res.status(200).json({
      message: "success",
      data: {
        laporan: findLaporan[0],
        balasan: findBalasan[0],
        admin: findAdmin[0],
        nama: findUser[0].nama,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getLaporan, createLaporan, riwayat, riwayatDetail };
