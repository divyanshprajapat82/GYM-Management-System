const mongoose = require("mongoose");

let storeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

let StoreModel = mongoose.model("Store", storeSchema);
module.exports = { StoreModel };
