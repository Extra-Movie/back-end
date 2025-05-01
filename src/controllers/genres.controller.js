const MovieGenre = require("../models/MovieGenre");
const TvGenre = require("../models/TvShowGenre");

const getMovieGenres = async (req, res) => {
  try {
    const genres = await MovieGenre.find({}).sort({ name: 1 });
    if (!genres) {
      return res.status(404).json({ message: "No genres found" });
    }
    return res.status(200).json(genres);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching genres", error });
  }
};

const getTvGenres = async (req, res) => {
  try {
    const genres = await TvGenre.find({}).sort({ name: 1 });
    if (!genres) {
      return res.status(404).json({ message: "No genres found" });
    }
    return res.status(200).json(genres);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching genres", error });
  }
};

module.exports = {
  getMovieGenres,
  getTvGenres,
};
