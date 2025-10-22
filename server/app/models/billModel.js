const mongoose = require("mongoose");

let billSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

let BillModel = mongoose.model("Bill", billSchema);
module.exports = { BillModel };
