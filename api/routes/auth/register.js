
const express = require("express");
const router = express.Router();
const { createUser } = require("../../controllers/authController");

router.post("/", createUser); // Handles POST /api/register
module.exports = router;
