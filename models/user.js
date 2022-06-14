const mongoose = require("mongoose");
const Joi = require("joi");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 20,
    trim: true,
  },
  email: {
    type: String,
    minlength: 10,
    maxlength: 200,
    required: true,
  },
  password: {
    type: String,
    minlength: 5,
    maxlength: 1024,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  purchases: {
    type: Array,
    default: [],
  },
});

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(20).required(),
    email: Joi.string().min(10).max(200).required(),
    password: Joi.string().min(5).max(200).required(),
  });

  return schema.validate(user);
}

module.exports = { User, validateUser };
