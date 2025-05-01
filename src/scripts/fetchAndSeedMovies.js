const mongoose = require("mongoose");
const { getMovies } = require("../services/tmdb.service");
const Movie = require("../models/Movie");
require("dotenv").config({ path: "../../.env" });

mongoose.connect(process.env.MONGO_URI).then(
  () => {
    console.log("Connected to MongoDB");
    fetchAndSeedMovies()
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

async function fetchAndSeedMovies() {
  let totalPages = 550;
  for (let i = 1; i <= totalPages; i++) {
    try {
      const data = await getMovies(i);
      for (const movie of data.results) {
        const movieWithPage = {
          ...movie,
        };
        const existingMovie = await Movie.findOne({ id: movie.id });
        if (!existingMovie) {
          const newMovie = new Movie(movieWithPage);
          await newMovie.save();
          console.log(
            `Saved movie: ${movieWithPage.title} (ID: ${movieWithPage.id})`
          );
        } else {
          console.log(
            `Movie already exists: ${movieWithPage.title} (ID: ${movieWithPage.id})`
          );
        }
      }
    } catch (error) {
      console.error(`Error fetching page ${i}:`, error.message);
    }
  }
}
