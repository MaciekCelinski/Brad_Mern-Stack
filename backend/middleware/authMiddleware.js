const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

const protect = async (req, res, next) => {
	let token;

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {
		try {
			// get token from header
			token = req.headers.authorization.split(" ")[1];

			// verify token
			const decoded = jwt.verify(token, process.env.JWT_SECRET);

			// get user from the token and attach it to REQUEST
			req.user = await User.findById(decoded.id).select("-password");
			next();
		} catch (error) {
			console.log("error: ", error);
			res.status(401);
			next(new Error("Not authorized"));
		}
	}

	if (!token) {
		res.status(401);
		next(new Error("Not authorized, no token"));
	}
};

module.exports = { protect };
