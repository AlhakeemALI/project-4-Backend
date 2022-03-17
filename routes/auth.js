const express = require("express");
const router = express.Router();
const { showMessage } = require("../controllers/auth");

router.get("/:message", showMessage);

module.exports = router;
