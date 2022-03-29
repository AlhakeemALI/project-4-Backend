const mongoose = require("mongoose");
const User = require("./userModel");
const homeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    content: {
      type: String,
      required: [true, "Content is required"],
      maxlength: 1000,
    },
    location: {
      type: String,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: 0,
      trim: true,
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    images: [
      {
        url: String,
        filename: String,
      },
    ],

    from: {
      type: Date,
    },
    to: {
      type: Date,
    },
    room: {
      type: Number,
      required: ["true, Room is required"],
    },
  },
  { timestamps: true }
);

const home = mongoose.model("home", homeSchema);

module.exports = home;
