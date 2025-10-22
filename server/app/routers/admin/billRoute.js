let express = require("express");
const {
  addBill,
  viewBill,
  deleteBill,
  memberView,
} = require("../../controllers/admin/billController");
const { authMiddleware } = require("../../middleware/authMiddleware");

let billRoute = express.Router();

billRoute.post("/add-bill", authMiddleware, addBill);
billRoute.get("/view-bill", viewBill);
billRoute.delete("/delete/:id", deleteBill);
billRoute.get("/member-View", authMiddleware, memberView);

module.exports = { billRoute };
