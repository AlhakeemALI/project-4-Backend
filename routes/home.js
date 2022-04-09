const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { checkIsOwmer } = require("../middleware/isOwner");
const {
  getHome,
  createHome,
  upload,
  getAllPostedBy,
  removeHome,
  getOneHome,
  updateHome,
} = require("../controllers/home");
const formidableMiddleware = require("express-formidable");

router.get("/get-home", getHome);
router.post("/create-home", upload.array("images"), protect, createHome);
router.get("/postedby", protect, getAllPostedBy);
router.delete("/delete-home/:homeId", protect, checkIsOwmer, removeHome);
router.put("/home/edit/:homeId", upload.array("images"), protect, updateHome);
router.get("/home/:homeId", getOneHome);

//console.log(protect)

module.exports = router;
