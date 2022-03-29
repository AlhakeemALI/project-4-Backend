const express = require("express");
const router = express.Router();

const { createStripeId } = require("../controllers/stripe");

const { protect } = require("../middleware/authMiddleware");

router.post("/create-connect-account", protect, createStripeId);

module.exports = router;
