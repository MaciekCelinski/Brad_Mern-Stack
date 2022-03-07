const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../models/userModel");

// @desc    Get user data
// @route   GET /api/users/me
// @access  PRIVATE
const getMe = async (req, res, next) => {

	console.log("req.user: ", req.user)

	const { _id, name, email } = await User.findById(req.user.id);
	res.status(200).json({ id: _id, name, email });
};

// @desc    Register User
// @route   POST /api/users/
// @access  PUBLIC
const registerUser = async (req, res, next) => {
	// res.json({ message: "Register User" });
	const { name, email, password } = req.body;

	if (!name || !email || !password) {
		res.status(400);
		throw new Error("Please add all fileds");
	}

	// Check if user exists
	const userExists = await User.findOne({ email });

	if (userExists) {
		res.status(400);
		throw new Error("User already exists");
	}

	// hash password
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	try {
		// create user
		const user = await User.create({
			name,
			email,
			password: hashedPassword,
		});

		if (user) {
			res.status(201).json({
				_id: user.id,
				name: user.name,
				email: user.email,
				token: generateToken(user._id),
			});
		}
	} catch (error) {
		res.status(400);
		next(Error(error))
		next(new Error("Something went wrong"));
	}
};

// @desc    Authenticate User
// @route   POST /api/users/login
// @access  PUBLIC
const loginUser = async (req, res, next) => {
	const { email, password } = req.body;
	// console.log('email: ', email, 'password: ', password)

	try {
		// check for user email
		const user = await User.findOne({ email });
		console.log('user: ', user)
		if (!user) {
			res.status(400);
			next(new Error("There is no such user"));
		}

		// check for correct password
		const correctPassword = await bcrypt.compare(password, user.password);
		console.log('correctPassword: ', correctPassword)

		if (correctPassword === true) {
			res.status(200).json({
				_id: user._id,
				name: user.name,
				email: user.email,
				token: generateToken(user._id),
			});
		} else {
			res.status(500).json({message: "Invalid credentials"})
		}
	} catch (error) {
		res.status(400);
		next(Error(error))
		next(new Error("Invalid creadentials"));
	}
};

// Generate JWT
const generateToken = (id) => {
	console.log("id: ", id);
	return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

module.exports = { registerUser, loginUser, getMe };
