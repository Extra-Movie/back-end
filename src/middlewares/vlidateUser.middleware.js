const validation = require("../utils/registerAjv");
module.exports = (req, res, next) => {
  const valid = validation(req.body);
  if (!valid) {
    return res.status(400).json({
      message: "Validation failed",
      errors: validation.errors,
    });
  }
  next();
};
