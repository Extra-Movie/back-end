const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multer.middleware");
const {
  getMovies,
  deleteMovie,
  addMovie,
} = require("../controllers/movies.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.get("/", authMiddleware, getMovies);
router.post(
  "/",
  upload.fields([
    { name: "poster_path", maxCount: 1 },
    { name: "backdrop_path", maxCount: 1 },
  ]),
  addMovie
);
router.delete("/:id",  deleteMovie);

module.exports = router;
