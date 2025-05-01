const app = require("./app");
const mogoose = require("mongoose");
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 8000;

mogoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection failed", err);
  });
