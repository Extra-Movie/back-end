const mongoose = require("mongoose");

const tvSchema = new mongoose.Schema(
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
    origin_country: {
      type: [String],
      default: [],
    },
    original_language: {
      type: String,
    },
    original_name: {
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
    first_air_date: {
      type: String,
    },
    name: {
      type: String,
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

tvSchema.index({ genre_ids: 1 });
tvSchema.index({ original_name: 1 });
tvSchema.index({ name: 1 });
tvSchema.index({ release_date: 1 });
tvSchema.index({ vote_average: 1 });
tvSchema.index({ vote_count: 1 });
tvSchema.index({ popularity: 1 });
tvSchema.index({ number_of_purchases: 1 });
tvSchema.index({ visited: 1 });

// module.exports = mongoose.model("tvshows", tvSchema);

module.exports = mongoose.model("tvShows", tvSchema);
