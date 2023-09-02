const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../model/user");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashed_password = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashed_password,
    });

    const doesEmailExist = await User.findOne({ email: req.body.email });
    if (doesEmailExist) {
      return res.status(400).json({ message: "Email is already registered" });
    }
    const isUsernameTaken = await User.findOne({ username: req.body.username });
    if (isUsernameTaken) {
      return res.status(400).json({ message: "Username is already taken" });
    }

    const user = await newUser.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/verify", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ message: "Email not registered" });
    }

    const validated = await bcrypt.compare(req.body.password, user.password);
    if (!validated) {
      return res.status(400).json({ message: "Wrong password" });
    }

    return res.json({ user: user });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
