const mongoose = require("mongoose");

let authSchema = new mongoose.Schema(
  {
    userName: String,
    userEmail: {
      type: String,
      unique: true,
      required: true,
      minLength: 2,
      maxLength: 50,
    },
    userPassword: String,
    userType: {
      type: String,
      // enum: ["user", "admin", "member"],
      // default: "user",
    },
    membership: {
      type: String,
      //   enum: ["Basic Plan", "Standard Plan", "Premium Plan"],
    },
    userPhone: Number,
    userImage: String,
  },
  {
    timestamps: true, // This adds createdAt and updatedAt fields automatically
  }
);

let AuthModel = mongoose.model("User", authSchema);
module.exports = { AuthModel };
