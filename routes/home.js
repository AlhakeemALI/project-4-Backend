const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { getHome, createHome, upload } = require("../controllers/home");
const formidableMiddleware = require("express-formidable");

router.get("/get-home", getHome);
router.post("/create-home", upload.array("images"), protect, createHome);

module.exports = router;
