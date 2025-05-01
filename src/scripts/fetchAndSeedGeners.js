const mongoose = require("mongoose");
const { getMovieGenres, getTvShowGenres } = require("../services/tmdb.service");
const MovieGenre = require("../models/MovieGenre");
const TvShowGenre = require("../models/TvShowGenre");
require("dotenv").config({ path: "../../.env" });

mongoose.connect(process.env.MONGO_URI).then(
  () => {
    console.log("Connected to MongoDB");
    fetchAndSeedMovieGenres()
      .then(() => {
        console.log("Finished fetching and seeding movies.");
        mongoose.connection.close();
      })
      .catch((err) => {
        console.error("Error during fetching and seeding:", err.message);
        mongoose.connection.close();
      });
    fetchAndSeedTvShowGenres()
      .then(() => {
        console.log("Finished fetching and seeding movies.");
        mongoose.connection.close();
      })
      .catch((err) => {
        console.error("Error during fetching and seeding:", err.message);
        mongoose.connection.close();
      });
  },
  (err) => {
    console.error("Error connecting to MongoDB:", err.message);
  }
);

async function fetchAndSeedMovieGenres() {
  const genres = await getMovieGenres();
  for (const genre of genres.genres) {
    const existingGenre = await MovieGenre.findOne({ id: genre.id });
    if (!existingGenre) {
      const newGenre = new MovieGenre(genre);
      await newGenre.save();
      console.log(`Saved genre: ${genre.name} (ID: ${genre.id})`);
    }
  }
  mongoose.connection.close();
}

async function fetchAndSeedTvShowGenres() {
  const genres = await getTvShowGenres();
  for (const genre of genres.genres) {
    const existingGenre = await TvShowGenre.findOne({ id: genre.id });
    if (!existingGenre) {
      const newGenre = new TvShowGenre(genre);
      await newGenre.save();
      console.log(`Saved genre: ${genre.name} (ID: ${genre.id})`);
    }
  }
  mongoose.connection.close();
}
