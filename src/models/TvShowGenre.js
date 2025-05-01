const mongoose = require("mongoose");

const tvShowGenreSchema = new mongoose.Schema(
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

tvShowGenreSchema.index({ id: 1 });
tvShowGenreSchema.index({ name: 1 });

module.exports = mongoose.model("tvshowgenres", tvShowGenreSchema);
