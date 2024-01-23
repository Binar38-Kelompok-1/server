const responseError = require("../middleware/responseError");

const validation = (data, schema) => {
  const result = schema.validate(data, {
    abortEarly: false,
    allowUnknown: false,
  });
  if (result.error) {
    throw new responseError(400, result.error.message);
  } else {
    return result.value;
  }
};

module.exports = validation;
