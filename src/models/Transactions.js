const mongoose = require("mongoose");
const { Schema } = mongoose;
const contentSchema = new mongoose.Schema({
  movies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
    },
  ],
  tvShows: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TVShow",
    },
  ],
});
const transactionSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    purchased: {
      type: contentSchema,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
    paymentMethod: {
      type: String,
      enum: ["credit_card", "paypal", "stripe"],
      required: true,
    },
    TransactionId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Transaction", transactionSchema);
