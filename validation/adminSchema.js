const joi = require("joi");

const register = joi.object({
  username: joi.string().max(100).required(),
  password: joi.string().max(100).required(),
  nama: joi.string().max(100).required(),
  no_telp: joi.string().max(100).required(),
  alamat: joi.string().max(100).required(),
});

const login = joi.object({
  username: joi.string().max(100).required(),
  password: joi.string().max(100).required(),
});

const getAdmin = joi.object({
  id: joi.number().integer().max(9999999999999999).required(),
});

const update = joi.object({
  id: joi.number().integer().max(9999999999999999).required(),
  username: joi.string().max(100).required(),
  nama: joi.string().max(100).required(),
  no_telp: joi.string().max(100).optional(),
  alamat: joi.string().max(100).required(),
});

const passwordPost = joi.object({
  id: joi.number().integer().max(9999999999999999).required(),
  password: joi.string().max(100).required(),
});

module.exports = { login, register, getAdmin, update, passwordPost };
