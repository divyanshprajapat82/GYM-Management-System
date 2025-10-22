// const mongoose = require("mongoose");

// let authSchema = new mongoose.Schema(
//   {
//     Name: String,
//     Email: {
//       type: String,
//       unique: true,
//       required: true,
//       minLength: 2,
//       maxLength: 50,
//     },
//     Password: String,
//     Membership: {
//       type: String,
//       enum: ["Basic Plan", "Standard Plan", "Premium Plan"],
//     },
//   },
//   {
//     timestamps: true, // This adds createdAt and updatedAt fields automatically
//   }
// );

// let AuthModel = mongoose.model("User", authSchema);
// module.exports = { AuthModel };
