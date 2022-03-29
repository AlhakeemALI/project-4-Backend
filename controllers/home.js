const asyncHandler = require("express-async-handler");
const Home = require("../models/home");
const User = require("../models/userModel");
const { storage } = require("../cloudinar");

const multer = require("multer");
let upload = multer({ storage });

const getHome = asyncHandler(async (req, res) => {
  const home = await Home.find({}).populate("postedBy");
  res.status(200).json(home);
});

const createHome = asyncHandler(async (req, res) => {
  //const { title, content, location, price, room } = req.body;
  console.log(req.body);
  console.log("this is req.file=====>", req);

  // if (!title || !content || !price || !room) {
  //   res.status(400);
  //   throw new Error("Please add all the required field");
  // }

  const newHome = new Home(req.body);
  newHome.images = req.files.map((f) => ({
    url: f.path,
    filename: f.filename,
  }));
  newHome.postedBy = req.user.id;

  await newHome.save();

  const findUser = await User.findById(req.user.id);

  if (!findUser) {
    res.status(401);
    throw new Error("User not found");
  }

  // newHome.images = req.file.map((f) => ({
  //   url: f.path,
  //   filename: f.filename,
  // }));
  // const product = {
  //   title: req.body,
  //   content: req.body,
  //   price: req.body,
  //   room: req.body,
  //   from: req.body,
  //   to: req.body,
  //   location: req.body,
  //   images: {
  //     url: req.body.url,
  //     filename: req.body.filename,
  //   },
  // };

  //const newHome = await Home.create(req.body);

  //console.log(newHome);
  //const home = new Home(req.body);

  //await home.save();
  console.log("new home ====>", newHome);
  //newHome.save();
  res.status(200).json({ message: "Create new Home" });
});

module.exports = {
  getHome,
  createHome,
  upload,
};
