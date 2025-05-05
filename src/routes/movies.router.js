const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multer.middleware");
const {
  getMovies,
  deleteMovie,
  addMovie,
  getMovieById,
  getTopMovies,
} = require("../controllers/movies.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const adminMiddleware = require("../middlewares/admin.middleware");

router.get("/", getMovies);
router.get("/:id", getMovieById);
router.get("/top", getTopMovies);
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  upload.fields([
    { name: "poster_path", maxCount: 1 },
    { name: "backdrop_path", maxCount: 1 },
  ]),
  addMovie
);
router.delete("/:id", authMiddleware, adminMiddleware, deleteMovie);

module.exports = router;
