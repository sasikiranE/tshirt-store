const mongoose = require("mongoose");

const tshirtCartSchema = new mongoose.Schema({
  tshirt: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tshirt",
  },
  quantity: Number,
  unitPrice: Number,
});

const orderSchema = new mongoose.Schema(
  {
    tshirts: [tshirtCartSchema],
    transactionId: String,
    amount: Number,
    address: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 200,
      trim: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
const TshirtCart = mongoose.model("TshirtCart", tshirtCartSchema);

module.exports = { Order, TshirtCart };
