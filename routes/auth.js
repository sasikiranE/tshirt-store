const express = require("express");
const router = express.Router();
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const Joi = require("joi");

function validate(user) {
  const schema = Joi.object({
    email: Joi.string().min(10).max(200).email().required(),
    password: Joi.string().min(5).max(200).required(),
  });

  return schema.validate(user);
}

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password");

  const isValid = await bcrypt.compare(req.body.password, user.password);
  if (!isValid) return res.status(400).send("Invalid email or password");

  res.send("OK");
});

module.exports = router;
