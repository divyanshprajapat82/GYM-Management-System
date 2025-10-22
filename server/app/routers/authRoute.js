let express = require("express");
const {
  login,
  register,
  loginView,
  addUser,
  singleView,
  profileView,
  updateUser,
  deleteUser,
} = require("../controllers/authController");
const { authMiddleware } = require("../middleware/authMiddleware");

let authRoute = express.Router();

authRoute.post("/add-user", addUser);
authRoute.post("/register", register);
authRoute.post("/login", login);
authRoute.get("/view", loginView);
authRoute.get("/profile-View", authMiddleware, profileView);
authRoute.get("/view/:id", singleView);
authRoute.delete("/delete/:id", deleteUser);
authRoute.put("/update/:id", updateUser);

module.exports = { authRoute };
