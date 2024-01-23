const joi = require("joi");

const login = joi.object({
  nik: joi.string().max(100).required(),
  password: joi.string().max(100).required(),
});

const register = joi.object({
  nik: joi.string().max(100).required(),
  nama: joi.string().max(100).required(),
  password: joi.string().max(100).required(),
  no_telp: joi.string().max(100).required(),
  alamat: joi.string().max(100).required(),
});

const getUser = joi.object({
  id: joi.number().integer().max(9999999999999999).required(),
});

const postUser = joi.object({
  id: joi.number().integer().max(9999999999999999).required(),
  nik: joi.string().max(100).required(),
  nama: joi.string().max(100).required(),
  no_telp: joi.string().max(100).required(),
  alamat: joi.string().max(100).required(),
});

const editUser = joi.object({
  nama: joi.string().max(100).required(),
  no_telp: joi.string().max(100).required(),
  alamat: joi.string().max(100).required(),
});

const postPassword = joi.object({
  id: joi.number().integer().max(9999999999999999).required(),
  password: joi.string().max(100).required(),
});

module.exports = { login, register, getUser, postUser, postPassword, editUser };
