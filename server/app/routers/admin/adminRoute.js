let express = require("express");
const { authRoute } = require("../authRoute");
const { billRoute } = require("./billRoute");
const { storeRoute } = require("./storeRoute");
const { ditePlanRoute } = require("./ditePlanRoute");

let adminRoute = express.Router();

adminRoute.use("/auth", authRoute);
adminRoute.use("/bill", billRoute);
adminRoute.use("/store", storeRoute);
adminRoute.use("/dite", ditePlanRoute);

module.exports = { adminRoute };
