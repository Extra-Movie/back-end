const app = require("./app");
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 8000;


app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
