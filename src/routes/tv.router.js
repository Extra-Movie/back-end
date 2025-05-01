const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multer.middleware");
const {
  getTvShows,
  addTvShow,
  deleteTvShow,
} = require("../controllers/tv.controller");

router.get("/", getTvShows);
router.post(
  "/",
  upload.fields([
    { name: "poster_path", maxCount: 1 },
    { name: "backdrop_path", maxCount: 1 },
  ]),
  addTvShow
);
router.delete("/:id", deleteTvShow);

module.exports = router;
