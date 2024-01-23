const joi = require("joi");

const getBalasan = joi.object({
  id: joi.number().required(),
});

const createBalasan = joi.object({
  isi_balasan: joi.string().required(),
  id_laporan: joi.number().required(),
  id_petugas: joi.number().required(),
});

module.exports = {
  getBalasan,
  createBalasan,
};
