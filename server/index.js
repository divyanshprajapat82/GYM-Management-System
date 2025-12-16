let express = require("express");
let cors = require("cors");
const { default: mongoose } = require("mongoose");
const { adminRoute } = require("./app/routers/admin/adminRoute");
const { webRoute } = require("./app/routers/web/webRoute");
const { AuthModel } = require("./app/models/AuthModel");
require("dotenv").config();

let app = express();
app.use(express.json());
// app.use(cors());

app.use(
  cors({
    origin: [
      "https://gym-management-system-bay.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use("/admin", adminRoute);
app.use("/web", webRoute);

mongoose
  // .connect("mongodb://127.0.0.1:27017/gymManagementSystem")
  .connect("mongodb+srv://divyanshprajapat82_db_user:frYlR54Zh1vEMu9d@cluster0.vn9kvxp.mongodb.net/")
  .then(async () => {
    const checkAdmin = await AuthModel.findOne({ userType: "admin" });
    if (!checkAdmin) {
      await AuthModel.create({
        userName: "Admin",
        userEmail: "admin@gmail.com",
        userPassword: "admin1234",
        userType: "admin",
      });
    }

    console.log("DB Connected");
    app.listen(process.env.PORT, () => console.log("Server running on 8000"));

  })
  .catch((err) => {
    console.error("Mongo connection error:", err);
    process.exit(1);
  });
