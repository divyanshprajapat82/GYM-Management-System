const mongoose = require("mongoose");

let ditePlanSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    healthScore: {
      type: Number,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    cal: {
      type: Number,
      required: true,
    },
    carbs: {
      type: Number,
      required: true,
    },
    protein: {
      type: Number,
      required: true,
    },
    fats: {
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

let DitePlanModel = mongoose.model("DitePlan", ditePlanSchema);
module.exports = { DitePlanModel };
