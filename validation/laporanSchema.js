const joi = require("joi");

const getLaporan = joi.object({
  id_masyarakat: joi.number().required(),
});

const createLaporan = joi.object({
  isi_laporan: joi.string().max(100).required(),
  id_masyarakat: joi.number().required(),
  status: joi.boolean().required(),
  foto: joi.string().max(100).optional(),
});

const riwayatDetail = joi.object({
  id_masyarakat: joi.number().required(),
  id_laporan: joi.number().required(),
});

module.exports = { getLaporan, createLaporan, riwayatDetail };
