require("dotenv").config();
const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const token = req.cookies.jwt;
   // check json exists and is verified
  if (token) {
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.status(403).redirect("/");
        // If the token is provided but invalid (e.g., expired or tampered with): Status code 403 (Forbidden) can be used. This indicates that the user is authenticated but does not have permission to access the requested resource. In this case, you can redirect the user to the login page or display an error message.
      } else {
        next();
      }
    });
  } else {
    // token is missing or not provided
    // If the token is missing or not provided: Status code 401 (Unauthorized) can be used. This indicates that the user is not authenticated and should be redirected to the login page.
    res.status(401).redirect("/");
  }
};
module.exports = authenticateToken;
