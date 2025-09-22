const express = require("express");
const router = express.Router();
const middleware = require("../middlewares/authenticate");

// Cloudinary + Multer setup
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

// configure cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// storage engine for multer (uploads directly to Cloudinary)
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "user_profiles", // folder name in cloudinary
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
    public_id: (req, file) => Date.now() + "_" + file.originalname, // unique file name
  },
});

const upload = multer({ storage });

// import controllers
const {
  userlogin,
  userlogout,
  findusers,
  dashboard,
  loginPage,
  adduser,
  getusers,
  deluser,
  edituser,
  signup,
  updateuser,
  viewuser,
} = require("../controller/users");

// routes
router.post("/login", userlogin);
router.get("/", getusers);
router.get("/users", middleware, findusers);
router.get("/dashboard", dashboard);
router.get("/login", loginPage);
router.get("/logout", userlogout);
router.get("/adduser", middleware, adduser);
router.post("/signup", upload.single("profile_img"), signup);
router.delete("/delUser", middleware, deluser);
router.get("/edituser", edituser);
router.post(
  "/updateuser/:id",
  middleware,
  upload.single("profile_img"),
  updateuser
);
router.get("/viewuser", middleware, viewuser);

module.exports = router;
