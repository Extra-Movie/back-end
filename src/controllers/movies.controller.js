const Movie = require("../models/Movie");
require("dotenv").config({ path: "../../.env" });

const getMovies = async (req, res) => {
  console.log(req.isAdmin);
  const page = req.query.page || 1;
  const limit = 20;
  const skip = (page - 1) * limit;
  let filter = {};

  if (req.query.search) {
    filter.title = { $regex: req.query.search, $options: "i" };
  }
  if (req.query.year) {
    filter.release_date = req.query.year;
  }
  if (req.query.genre) {
    filter.genre_ids = { $in: [parseInt(req.query.genre)] };
  }
  if (req.query.vote_average) {
    const vote = parseInt(req.query.vote_average);
    filter.vote_average = { $gte: vote, $lt: vote + 1 };
  }

  if (req.query.popularity) {
    const pop = parseInt(req.query.popularity);
    filter.popularity = { $gte: pop, $lt: pop + 1 };
  }

  try {
    const totalMovies = await Movie.countDocuments({ ...filter });
    const totalPages = Math.ceil(totalMovies / limit);
    const movies = await Movie.find({ ...filter })
      .skip(skip)
      .limit(limit)
      .sort({
        release_date: -1,
      });

    if (!movies) {
      return res.status(404).json({ message: "No movies found" });
    }
    return res.status(200).json({
      movies,
      page: parseInt(page),
      totalPages,
      totalMovies,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching movies", error });
  }
};

const getTopMovies = async (req, res) => {
  const topNum = parseInt(req.query.topNum) || 10;
  try {
    const movies = await Movie.find({})
      .sort({ vote_average: -1 })
      .limit(topNum);
    if (!movies) {
      return res.status(404).json({ message: "No movies found" });
    }
    return res.status(200).json({ movies });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching movies", error });
  }
};

const getMovieById = async (req, res) => {
  const { id } = req.params;
  try {
    const movie = await Movie.findById(id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    movie.visited = movie.visited + 1; 
    await movie.save();
    return res.status(200).json({ movie });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching movie", error });
  }
};

const addMovie = async (req, res) => {
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
  const movie = new Movie(data);
  try {
    await movie.save();
    return res.status(201).json({ message: "Movie added successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error adding movie", error });
  }
};

const deleteMovie = async (req, res) => {
  const { id } = req.params;
  const movie = await Movie.findByIdAndDelete(id);
  if (!movie) {
    return res.status(404).json({ message: "Movie not found" });
  }
  return res.status(200).json({ message: "Movie deleted successfully" });
};

module.exports = {
  getMovies,
  deleteMovie,
  addMovie,
  getMovieById,
  getTopMovies,
};
