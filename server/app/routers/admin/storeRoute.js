let express = require("express");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { cloudinary } = require("../../utils/cloudinary");
const {
  addProduct,
  viewProduct,
  updateproduct,
  deleteproduct,
  singleproduct,
} = require("../../controllers/admin/storeController");
const multer = require("multer");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "GYM-Management-System/supplement-store", // folder name in your Cloudinary account
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    transformation: [{ quality: "auto" }], // optional optimization
  },
});

let upload = multer({ storage: storage });

let storeRoute = express.Router();

storeRoute.post("/add-product", upload.single("image"), addProduct);
storeRoute.get("/view-product", viewProduct);
storeRoute.get("/view/:id", singleproduct);
storeRoute.delete("/delete/:id", deleteproduct);
storeRoute.put("/update/:id", upload.single("image"), updateproduct);

module.exports = { storeRoute };
