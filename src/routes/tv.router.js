const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multer.middleware");
const {
  getTvShows,
  addTvShow,
  deleteTvShow,
  getTvShowById,
} = require("../controllers/tv.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const adminMiddleware = require("../middlewares/admin.middleware");

router.get("/", authMiddleware, getTvShows);
router.get("/:id", authMiddleware, getTvShowById);
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  upload.fields([
    { name: "poster_path", maxCount: 1 },
    { name: "backdrop_path", maxCount: 1 },
  ]),
  addTvShow
);
router.delete("/:id", authMiddleware, adminMiddleware, deleteTvShow);

module.exports = router;
