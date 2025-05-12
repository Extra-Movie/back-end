const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    adult: {
      type: Boolean,
      default: false,
    },
    backdrop_path: {
      type: String,
    },
    genre_ids: {
      type: [Number],
      default: [],
    },
    original_language: {
      type: String,
    },
    original_title: {
      type: String,
    },
    overview: {
      type: String,
    },
    popularity: {
      type: Number,
    },
    poster_path: {
      type: String,
    },
    release_date: {
      type: String,
    },
    title: {
      type: String,
    },
    video: {
      type: Boolean,
      default: false,
    },
    vote_average: {
      type: Number,
    },
    vote_count: {
      type: Number,
    },
    price: {
      type: Number,
      default: 40,
    },
    number_of_purchases: {
      type: Number,
      default: 0,
    },
    visited: {
      type: Number,
      default: 0,
    },
  },
  {
    strict: "throw",
  }
);

movieSchema.index({ genre_ids: 1 });
movieSchema.index({ original_title: 1 });
movieSchema.index({ title: 1 });
movieSchema.index({ release_date: 1 });
movieSchema.index({ vote_average: 1 });
movieSchema.index({ vote_count: 1 });
movieSchema.index({ popularity: 1 });
movieSchema.index({ number_of_purchases: 1 });
movieSchema.index({ visited: 1 });

module.exports = mongoose.model("movies", movieSchema);
