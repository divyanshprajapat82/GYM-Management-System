let express = require("express");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { cloudinary } = require("../../utils/cloudinary");
const multer = require("multer");
const {
  addDite,
  updateDite,
  deleteDite,
  singleDite,
  viewDite,
} = require("../../controllers/admin/ditePlanController");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "GYM-Management-System/dite-plan", // folder name in your Cloudinary account
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    transformation: [{ quality: "auto" }], // optional optimization
  },
});

let upload = multer({ storage: storage });

let ditePlanRoute = express.Router();

ditePlanRoute.post("/add-dite", upload.single("image"), addDite);
ditePlanRoute.get("/view-dite", viewDite);
ditePlanRoute.get("/view/:id", singleDite);
ditePlanRoute.delete("/delete/:id", deleteDite);
ditePlanRoute.put("/update/:id", upload.single("image"), updateDite);

module.exports = { ditePlanRoute };
