const asyncHandler = require("express-async-handler");
const Home = require("../models/home");
const User = require("../models/userModel");
const { storage } = require("../cloudinar");

const multer = require("multer");
let upload = multer({ storage });

const getHome = asyncHandler(async (req, res) => {
  const home = await Home.find({}).populate("postedBy", "_id, name");
  res.status(200).json(home);
});

const createHome = asyncHandler(async (req, res) => {
  //const { title, content, location, price, room } = req.body;
  //console.log(req.body);
  //console.log("this is req.file=====>", req);
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

  console.log("new home ====>", newHome);

  res.status(200).json(newHome);
});

const getAllPostedBy = asyncHandler(async (req, res) => {
  console.log("hello");
  console.log(req.user.id);
  const homePostedBy = await Home.find({ postedBy: req.user.id }).populate(
    "postedBy",
    "id , name"
  );
  console.log(homePostedBy);

  res.status(200).json(homePostedBy);
});

const removeHome = asyncHandler(async (req, res) => {
  const deleteHome = await Home.findByIdAndDelete(req.params.homeId);
  console.log(deleteHome);
  res.status(204).json(deleteHome);
});

const getOneHome = asyncHandler(async (req, res) => {
  const fineOneHome = await Home.findById(req.params.homeId).populate(
    "postedBy",
    "name"
  );
  //console.log(fineOneHome);
  res.status(200).json(fineOneHome);
});

const updateHome = asyncHandler(async (req, res) => {
  console.log("hello");
  const findHome = await Home.findByIdAndUpdate(req.params.homeId, req.body, {
    new: true,
  });
  console.log(findHome);
  findHome.save();
  res.status(204).json(findHome);
});

module.exports = {
  getHome,
  createHome,
  upload,
  getAllPostedBy,
  removeHome,
  getOneHome,
  updateHome,
};
