const mongoose = require("mongoose");
console.log(process.env.MONGODB_URL,'process.env.MONGODB_URL')
const db = mongoose
  .connect(process.env.MONGODB_URL)
  .then((res) => {
    console.log("-------------database connected--------------");
  })
  .catch((err) => {
    console.log(err, "db -------------err----------");
  });
module.exports = db;
