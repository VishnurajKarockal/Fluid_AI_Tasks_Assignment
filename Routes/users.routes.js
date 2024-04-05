const express = require("express");
const { userModel } = require("../Model/users.model");
const userRouter = express.Router();
userRouter.use(express.json());
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

// Register new user
userRouter.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    bcrypt.hash(password, 5, async (err, hash) => {
      if (err) {
        res.status(400).json({ err });
      }
      const user = new userModel({ username, email, password: hash });
      await user.save();
      res.status(200).json({ msg: "New user has been added!" });
    });
  } catch (error) {
    res.status(500).json({ error });
  }
});

// User login
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  try {
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          // console.log("fffffffffffff", user);
          var token = jwt.sign(
            { userID: user._id, username: user.username },
            "masai"
          );
          res.status(200).json({ msg: "Logged in successful", token });
        } else {
          res.status(400).json({ msg: "Invalid password" });
        }
      });
    } else {
      res.status(400).json({ msg: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = { userRouter };
