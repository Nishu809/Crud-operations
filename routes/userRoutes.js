const express = require("express");
const router = express.Router();
const multer = require("multer");
const middleware = require("../middlewares/authenticate");
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
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(
      file,
      "---------------file-=-----------------------destination"
    );
    cb(null, "public/uploads/");
  },
  filename: (req, file, cb) => {
    console.log(file, "---------------file-=-----------------------filname");
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

router.post("/login", userlogin);
router.get("/", getusers);
router.get("/users", middleware, findusers);
router.get("/dashboard",   dashboard);
router.get("/login", loginPage);
router.get("/logout", userlogout);
router.get("/adduser", middleware, adduser);
router.post("/signup", upload.single("profile_img"), signup);
router.delete("/delUser", middleware, deluser);
router.get("/edituser", edituser);
router.post("/updateuser/:id", middleware, updateuser);
router.get("/viewuser", middleware, viewuser);

module.exports = router;
