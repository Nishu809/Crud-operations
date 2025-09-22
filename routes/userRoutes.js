const express = require("express");
const router = express.Router();
const multer = require("multer");
const streamifier = require("streamifier");
const middleware = require("../middlewares/authenticate");
const cloudinary = require("cloudinary").v2;

// cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// multer memory storage (keeps file in RAM, not disk)
const upload = multer({ storage: multer.memoryStorage() });

// helper: upload buffer to cloudinary
const uploadToCloudinary = (fileBuffer, folder = "user_profiles") => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      }
    );
    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
};

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

// signup with Cloudinary upload
router.post("/signup", upload.single("profile_img"), async (req, res, next) => {
  try {
    let imageUrl = null;
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer);
      imageUrl = result.secure_url;
    }
    // attach imageUrl to body so controller can save it
    req.body.profile_img = imageUrl;
    signup(req, res, next);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// delete user
router.delete("/delUser", middleware, deluser);

// edit user
router.get("/edituser", edituser);

// update user with Cloudinary upload
router.post(
  "/updateuser/:id",
  middleware,
  upload.single("profile_img"),
  async (req, res, next) => {
    try {
      let imageUrl = null;
      if (req.file) {
        const result = await uploadToCloudinary(req.file.buffer);
        imageUrl = result.secure_url;
      }
      req.body.profile_img = imageUrl;
      updateuser(req, res, next);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

router.get("/viewuser", middleware, viewuser);

module.exports = router;
