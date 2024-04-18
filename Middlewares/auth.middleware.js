const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = (req, res, next) => {
  const token_key = process.env.token_key;
  const token = req.headers.authorization?.split(" ")[1];
  if (!token)
    return res.status(401).json({ msg: "No token, authorization denied" });

  jwt.verify(token, token_key, (err, decoded) => {
    if (err) return res.status(400).json({ msg: "Invalid token" });
    req.body.userID = decoded.userID;
    req.body.username = decoded.username;
    next();
  });
};

module.exports = { auth };
