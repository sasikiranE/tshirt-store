const express = require("express");
const _ = require("lodash");
const router = express.Router();
const { User, validateUser } = require("../models/user");
const bcrypt = require("bcrypt");
const saltRounds = 10;

router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered");

  user = new User(_.pick(req.body, ["name", "email", "password"]));

  const salt = await bcrypt.genSalt(saltRounds);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();
  res.send(user);
});

module.exports = router;
