const knex = require("knex");
const knexConfig = require("../../knexfile");

const DB = knex(knexConfig.development);
module.exports = DB;
