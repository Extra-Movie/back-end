const Ajv = require("ajv");
const addFormats = require("ajv-formats");

const ajv = new Ajv();
addFormats(ajv);

module.exports = ajv.compile({
  type: "object",
  properties: {
    name: {
      type: "string",
      minLength: 3,
      maxLength: 30,
      pattern: "^[a-zA-Z0-9 ]+$",
    },
    email: { type: "string", format: "email" },
    password: {
      type: "string",
      minLength: 8,
      pattern: "^[a-zA-Z][a-zA-Z0-9_.]{3,}@[a-zA-Z]{3,}.[a-zA-Z]{3,}$",
    },
  },
  required: ["name", "email", "password"],
});
