const mongoose = require("mongoose");
const User = require("./userModel");
const Home = require("./home");

const orderSchema = new mongoose.Schema(
  {
    home: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Home",
    },
    orderBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const order = mongoose.model("Order", orderSchema);

module.exports = order;
