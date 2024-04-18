const express = require("express");
const { userModel } = require("../Model/users.model");
const userRouter = express.Router();
userRouter.use(express.json());
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
require("dotenv").config();

// Register new user
userRouter.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "This email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 5);
    const user = new userModel({ username, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ msg: "New user has been added!" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Failed to register user" });
  }
});

// User login
userRouter.post("/login", async (req, res) => {
  const token_key = process.env.token_key;
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  try {
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          // console.log("fffffffffffff", user);
          var token = jwt.sign(
            { userID: user._id, username: user.username },
            token_key
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
