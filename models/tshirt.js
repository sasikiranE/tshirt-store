const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectid = require("joi-objectid")(Joi);
const { categorySchema } = require("./category");

const tshirtSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
      trim: true,
    },
    category: {
      type: categorySchema,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
      max: 1000,
    },
    numberInStock: {
      type: Number,
      required: true,
      min: 0,
      max: 1000,
    },
    description: {
      type: String,
      minlength: 10,
      maxlength: 2000,
    },
  },
  { timestamps: true }
);

const Tshirt = mongoose.model("Tshirt", tshirtSchema);

function validateTshirt(tshirt) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    categoryId: Joi.objectid().required(),
    price: Joi.number().min(0).max(1000).required(),
    numberInStock: Joi.number().min(0).max(1000).required(),
  });

  return schema.validate(tshirt);
}

module.exports = { Tshirt, validateTshirt };
