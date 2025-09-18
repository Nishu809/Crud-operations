const express = require("express");
const app = express();
require("dotenv").config();
const path = require("path");
const port = 8000;
const db = require("./database/db");
const userRoute = require("./routes/userRoutes");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.use(
  bodyParser.json({
    limit: "50mb",
  })
);

app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
  })
);

app.use(express.static(path.join(__dirname, "public")));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/", userRoute);

app.get("/test", (req, res) => {
  console.log(req.body);
  res.send("Data received");
});

app.listen(port, () => {
  console.log("Server started on port " + port);
});
