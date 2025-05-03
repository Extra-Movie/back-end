const Tv = require("../models/Tv");

const getTvShows = async (req, res) => {
  const page = req.query.page || 1;
  const limit = 20;
  const skip = (page - 1) * limit;
  let filter = {};
  if (req.query.search) {
    filter.name = { $regex: req.query.search, $options: "i" };
  }
  if (req.query.year) {
    filter.first_air_date = req.query.year;
  }
  if (req.query.genre) {
    filter.genre_ids = { $in: [parseInt(req.query.genre)] };
  }
  if (req.query.vote_average) {
    filter.vote_average = { $equal: parseFloat(req.query.vote_average) };
  }
  if (req.query.popularity) {
    filter.popularity = { $equal: parseFloat(req.query.popularity) };
  }

  const totalMovies = await Tv.countDocuments({ ...filter });
  const totaltPages = Math.ceil(totalMovies / limit);
  const tvShows = await Tv.find({ ...filter })
    .skip(skip)
    .limit(limit)
    .sort({
      first_air_date: -1,
    });
  if (!tvShows) {
    return res.status(404).json({ message: "No tv shows found" });
  }
  return res.status(200).json({
    tvShows,
    page: parseInt(page),
    totalPages: totaltPages,
    totalMovies,
  });
};

const getTvShowById = async (req, res) => {
  const { id } = req.params;
  const tvShow = await Tv.findById(id);
  if (!tvShow) {
    return res.status(404).json({ message: "Tv show not found" });
  }
  return res.status(200).json({ tvShow });
};


const addTvShow = async (req, res) => {
  if (!req.files || !req.files.poster_path || !req.files.backdrop_path) {
    return res.status(400).json({ message: "Please upload all files" });
  }
  req.body.adult = req.body.adult === "true" ? true : false;
  const data = {
    ...req.body,
    poster_path:
      process.env.Host + "/uploads/" + req.files.poster_path[0].filename,
    backdrop_path:
      process.env.Host + "/uploads/" + req.files.backdrop_path[0].filename,
  };
  const movie = new Tv(data);
  try {
    await movie.save();
    return res.status(201).json({ message: "Movie added successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error adding movie", error });
  }
};
const deleteTvShow = async (req, res) => {
  const { id } = req.params;
  const tvShow = await Tv.findByIdAndDelete(id);
  if (!tvShow) {
    return res.status(404).json({ message: "Tv show not found" });
  }
  return res.status(200).json({ message: "Tv show deleted successfully" });
};

module.exports = {
  getTvShows,
  addTvShow,
  deleteTvShow,
  getTvShowById,
};
