const mongoose = require("mongoose");

const movieGenreSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  {
    strict: "throw",
  }
);

movieGenreSchema.index({ id: 1 });
movieGenreSchema.index({ name: 1 });

module.exports = mongoose.model("moviegenres", movieGenreSchema);
