const swaggerJsDoc = require("swagger-jsdoc");
const path = require("path");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "My API",
    version: "1.0.0",
    description: "My API Description",
  },
};

const options = {
  swaggerDefinition,
  apis: [
    path.join(__dirname, "../routes/*.js"),
    path.join(__dirname, "../swagger/swaggerDocs.js"),
  ],
};

const swaggerSpec = swaggerJsDoc(options);
module.exports = swaggerSpec;
