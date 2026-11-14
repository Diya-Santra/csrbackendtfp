const express = require("express");

const { authenticate } = require("../middleware/auth.middleware");
const { verify } = require("../controllers/auth.controller");

const router = express.Router();

router.get("/verify", authenticate, verify);

module.exports = router;
