const mongoose = require("mongoose");

const transactionSchema = mongoose.Schema(
  {
    to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      enums: ["CR", "DR"],
    },
  },
  {
    timestamps: true,
  }
);

const transactionModel = mongoose.model("Transaction", transactionSchema);

module.exports = transactionModel;
