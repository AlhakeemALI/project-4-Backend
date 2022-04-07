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
  console.log(req.body);

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
  const homePostedBy = await Home.find({ postedBy: req.user.id }).populate(
    "postedBy",
    "id , name"
  );

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

  res.status(200).json(fineOneHome);
});

const updateHome = asyncHandler((req, res) => {
  // console.log("hello");
  // console.log("findHome,", "<======this is home that you looking foor");
  //console.log(req, "REQ, ====>");

  // const findHome = await Home.findByIdAndUpdate(req.params.homeId, req.body, {
  //   new: true,
  // });
  // findHome.images = req.files.map((f) => ({
  //   url: f.path,
  //   filename: f.filename,
  // }));

  // images = req.files.map((f) => ({
  //   //   url: f.path,
  //   //   filename: f.filename,
  //   // }));
  // console.log(req.body, "this is ");
  // console.log("this is req ", req.params);

  Home.findOneAndUpdate({ _id: req.params.homeId }, req.body, {
    new: true,
  }).then((data) => res.status(200).json(data));
  //console.log(findHome, "find home");
  // const findHome = await Home.findOneAndUpdate(
  //   { _id: req.params.homeId },
  //   req.body,
  //   {
  //     new: true,
  //   }
  // );

  // console.log("this is find hom ===> ", findHome);
  // if (findHome) {
  //   console.log(findHome, "<===== HOME AFTER SAVE");
  //   //await findHome.save();
  //   res.send(findHome);
  // }
  console.log("this is find hom ===> ", findHome);
  // res.status(200).json(findHome);
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
