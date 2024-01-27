const db = require("../db/db");
const ResponseError = require("../middleware/responseError");
const validation = require("../validation/validation");
const laporanSchema = require("../validation/laporanSchema");
const adminSchema = require("../validation/adminSchema");
const balasanSchema = require("../validation/balasanSchema");

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
    // console.log(validData, "<== validData");
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
    // await db("petugas").insert({
    //   id: 1,
    //   nama: "testtest",
    //   username: "testtest",
    //   password: "adtesttestmin",
    //   no_telp: "081234567890",
    //   alamat: "testtest",
    // });

    // await db("balasan").insert({
    //   isi_balasan: "test isi balasan",
    //   id_laporan: validData.id_laporan,
    //   id_petugas: 1,
    // });

    const findBalasan = await db("balasan").where({
      id_laporan: validData.id_laporan,
    });

    if (!findBalasan.length > 0) {
      res.status(200).json({
        message: "success",
        data: {
          laporan: findLaporan[0],
          nama: findUser[0].nama,
          nik: findUser[0].nik,
        },
      });
    } else {
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
          nik: findUser[0].nik,
        },
      });
    }
  } catch (error) {
    next(error);
  }
};

const belumBalas = async (req, res, next) => {
  try {
    const data = {
      id: req.user.id,
    };

    const validData = validation(data, adminSchema.getAdmin);

    const laporan = await db("laporan")
      .join("masyarakat", "laporan.id_masyarakat", "=", "masyarakat.id")
      .where("laporan.status", "=", false);
    const findAdmin = await db("petugas")
      .where({ id: validData.id })
      .select(["id", "username", "nama", "no_telp", "alamat"]);

    if (!findAdmin.length > 0) {
      throw new ResponseError(404, "admin not found");
    }
    res.status(200).json({
      message: "success",
      laporan,
      data: findAdmin[0],
    });
  } catch (error) {
    next(error);
  }
};

const belumBalasDetail = async (req, res, next) => {
  try {
    const data = {
      id: req.user.id,
    };

    const validData = validation(data, adminSchema.getAdmin);

    const laporan = await db("laporan")
      .join("masyarakat", "laporan.id_masyarakat", "=", "masyarakat.id")
      .where("laporan.status", "=", false)
      .where("laporan.id_laporan", "=", req.params.idLap);

    const findUser = await db("masyarakat")
      .where({ id: laporan[0].id_masyarakat })
      .select("nik", "nama", "no_telp", "alamat");

    if (!findUser.length > 0) {
      throw new ResponseError(404, "user not found");
    }

    const findAdmin = await db("petugas")
      .where({ id: validData.id })
      .select(["id", "username", "nama", "no_telp", "alamat"]);

    if (!findAdmin.length > 0) {
      throw new ResponseError(404, "admin not found");
    }

    res.status(200).json({
      message: "success",
      laporan,
      data: {
        user: findUser[0],
        admin: findAdmin[0],
      },
    });
  } catch (error) {
    next(error);
  }
};

const balas = async (req, res, next) => {
  try {
    const data = {
      id_petugas: req.user.id,
      id_laporan: req.params.idLap,
      isi_balasan: req.body.isi_balasan,
    };
    const validData = validation(data, balasanSchema.createBalasan);

    const findLaporan = await db("laporan").where({
      id_laporan: validData.id_laporan,
    });
    if (!findLaporan) {
      throw new ResponseError(404, "laporan not found");
    }

    const balasan = await db("balasan").insert(data).returning("*");

    const laporan = await db("laporan")
      .where({ id_laporan: validData.id_laporan })
      .update({ status: true })
      .returning("*");

    res.status(200).json({
      message: "success",
      balas: balasan,
      laporan: laporan,
    });
  } catch (error) {
    next(error);
  }
};
const hapusLaporan = async (req, res, next) => {
  try {
    const data = {
      id_laporan: req.params.idLap,
    };
    const findLaporan = await db("laporan").where(data);
    if (!findLaporan.length > 0) {
      throw new ResponseError(404, "laporan not found");
    }
    await db("laporan").where(data).del();
    res.status(200).json({
      message: "success",
      data: findLaporan,
    });
  } catch (error) {
    next(error);
  }
};

const sudahBalas = async (req, res, next) => {
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

    const findLaporan = await db("laporan")
      .join("masyarakat", "laporan.id_masyarakat", "=", "masyarakat.id")
      .where({ status: true })
      .select("*");

    if (!findLaporan.length > 0) {
      throw new ResponseError(404, "laporan not found");
    }

    res.status(200).json({
      message: "success",
      nama: findAdmin[0],
      data: findLaporan,
    });
  } catch (error) {
    next(error);
  }
};

const sudahBalasDetail = async (req, res, next) => {
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

    const laporan = await db("laporan").where({
      id_laporan: req.params.idLap,
    });

    const findUser = await db("masyarakat").where({
      id: laporan[0].id_masyarakat,
    });

    const balasan = await db("balasan").where({
      id_laporan: req.params.idLap,
    });

    const dataAdmin = await db("petugas").where({
      id: balasan[0].id_petugas,
    });

    res.status(200).json({
      message: "success",
      dataLap: laporan[0],
      dataUser: findUser[0],
      dataBalas: balasan[0],
      dataAdmin: dataAdmin[0],
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getLaporan,
  createLaporan,
  riwayat,
  riwayatDetail,
  belumBalas,
  belumBalasDetail,
  balas,
  hapusLaporan,
  sudahBalas,
  sudahBalasDetail,
};
