const user = require("../models/userModel");
const jwt = require("jsonwebtoken");
async function userlogin(req, res) {
  try {
    console.log("login", req.body);

    let data = await user.findOne({ email: req.body.email });
    console.log(data);
    if (data === null) {
      return res.send({ msg: "user not found" });
    }
    if (data.password != req.body.password) {
      return res.send({ msg: "password doesn't match" });
    }
    if (data.role !== "admin") {
      return res.send({ msg: "you have not authorized" });
    }

    token = jwt.sign(
      { id: data._id, email: data.email },
      process.env.ACCESS_TOKEN,
      { expiresIn: "30m" }
    );
    res.cookie("jwt", token);
    res.redirect("/dashboard");
    return res.redirect("/");
  } catch (error) {
    return res.send({ msg: error });
  }
}

async function getusers(req, res) {
  try {
    let data = await user.find();
    return res.render("home.ejs", { data: data });
  } catch (error) {
    return res.send({ msg: error });
  }
}

async function findusers(req, res) {
  try {
    let data = await user.find();
    return res.render("users.ejs", { data: data });
  } catch (error) {
    return res.send({ msg: error });
  }
}

async function dashboard(req, res) {
  try {
    let data = await user.find();
    return res.render("./dashboard", { data: data });
  } catch (error) {
    return res.send({ msg: error });
  }
}

async function signup(req, res) {
  try {
    let data = req.body;
    console.log(data);
    console.log(req.file);
    if (req.file) {
      data.profile_img = req.file.originalname;
    }

    let usrdata = await user.findOne({ email: data.email });
    console.log(data, usrdata);
    if (usrdata !== null) {
      return res.send({ msg: "user has already registered with this email" });
    }
    let result = await user.insertOne(data);
    console.log(result);
    return res.redirect("/users");
  } catch (error) {
    return res.send({ msg: error.message });
  }
}

async function adduser(req, res) {
  try {
    return res.render("./signup");
  } catch (error) {
    return res.send({ msg: error });
  }
}

async function updateuser(req, res) {
  try {
    console.log(req.body);
    let id = req.params.id;
    let result = await user.updateOne(
      { _id: id },
      {
        $set: {
          name: req.body.name,
          mobile: req.body.mobile,
          landline: req.body.landline,
          team: req.body.team,
          role: req.body.role,
          job_title: req.body.job_title,
          user_permission: req.body.user_permission,
          status: req.body.status,
          user_access: req.body.user_access,
        },
      }
    );
    console.log(result, id);

    return res.redirect("/users");
  } catch (error) {
    return res.send({ msg: error.message });
  }
}

async function deluser(req, res) {
  try {
    let id = req.query.id;
    let result = await user.deleteOne({ _id: id });
    if (result.deletedCount == 1) {
      return res.send({ message: "success" });
    } else return res.send({ message: "error" });
  } catch (error) {
    return res.send({ msg: error });
  }
}

async function edituser(req, res) {
  try {
    let id = req.query.id;
    let result = await user.findOne({ _id: id });
    console.log(result, "---result----");

    return res.render("./edituser", { data: result });
  } catch (error) {
    return res.send({ msg: error.message });
  }
}

async function viewuser(req, res) {
  try {
    let id = req.query.id;
    let result = await user.findOne({ _id: id });
    console.log(result, "---result----");

    return res.render("./viewuser", { data: result });
  } catch (error) {
    return res.send({ msg: error.message });
  }
}

async function userlogout(req, res) {
  try {
    res.cookie("jwt", "", { maxAge: 1 });
    res.redirect("/");
  } catch (error) {
    return res.send({ err: error });
  }
}

async function loginPage(req, res) {
  try {
    res.render("./login");
  } catch (error) {
    return res.send({ err: error });
  }
}

module.exports = {
  userlogin,
  loginPage,
  userlogout,
  adduser,
  dashboard,
  signup,
  findusers,
  deluser,
  edituser,
  updateuser,
  viewuser,
  getusers,
};
