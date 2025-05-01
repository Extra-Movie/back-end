const mongoose = require("mongoose");
const { getSeries } = require("../services/tmdb.service");
const Tv = require("../models/Tv");
require("dotenv").config({ path: "../../.env" });

mongoose.connect(process.env.MONGO_URI).then(
  () => {
    console.log("Connected to MongoDB");
    fetchAndSeedTv()
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

async function fetchAndSeedTv() {
  let totalPages = 500;
  for (let i = 1; i <= totalPages; i++) {
    try {
      const data = await getSeries(i);
      for (const movie of data.results) {
        const movieWithPage = {
          ...movie,
        };
        const existingMovie = await Tv.findOne({ id: movie.id });
        if (!existingMovie) {
          const newMovie = new Tv(movieWithPage);
          await newMovie.save();
          console.log(
            `Saved movie: ${movieWithPage.name} (ID: ${movieWithPage.id})`
          );
        } else {
          console.log(
            `Movie already exists: ${movieWithPage.name} (ID: ${movieWithPage.id})`
          );
        }
      }
    } catch (error) {
      console.error(`Error fetching page ${i}:`, error.message);
    }
  }
}
