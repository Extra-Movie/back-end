const Ajv = require("ajv");
const ajv = new Ajv();
module.exports = ajv.compile({
  type: "object",
  properties: {
    email: { type: "string", format: "email" },
    password: {
      type: "string",
      minLength: 8,
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
    },
  },
  required: ["email", "password"],
});
