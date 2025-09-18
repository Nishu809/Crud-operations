const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
  },
  mobile: {
    type: String,
  },
  job_title: {
    type: String,
  },
  landline: {
    type: String,
  },
  status: {
    type: String,
  },
  role: {
    type: String,
  },
  user_permission: {
    type: String,
  },
  user_access: {
    type: String,
  },
  team: {
    type: String,
  },
  profile_img: {
    type: String,
  },
});

const users = mongoose.model("users", userSchema);
module.exports = users;
