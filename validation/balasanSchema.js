const joi = require("joi");

const getBalasan = joi.object({
  id: joi.number().required(),
});

module.exports = {
  getBalasan,
};
