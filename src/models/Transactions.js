const mongoose = require("mongoose");
const { Schema } = mongoose;

const transactionSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    purchased: [
      {
        item: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          refPath: "purchased.kind",
        },
        kind: {
          type: String,
          required: true,
          enum: ["movies", "tvShows"],
        },
      },
    ],
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



transactionSchema.index({ createdAt: 1 }); 
transactionSchema.index({ amount: 1 });
transactionSchema.index({ status: 1 });

module.exports = mongoose.model("Transaction", transactionSchema);
