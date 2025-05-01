const express = require("express");
const router = express.Router();
const {
  getMovieGenres,
  getTvGenres,
} = require("../controllers/genres.controller");

router.get("/movie", getMovieGenres);
router.get("/tv", getTvGenres);

module.exports = router;
