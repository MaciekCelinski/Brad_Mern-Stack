const express = require("express");

const {
	registerUser,
	loginUser,
	getMe,
} = require("../controllers/userController");

const {protect} = require('../middleware/authMiddleware')

const router = express.Router();


router.get("/me", protect, getMe); // <--- GET MY DATA
router.post("/", registerUser); // <--- REGISTER USER
router.post("/login", loginUser); // <--- LOGIN USER

module.exports = router;
