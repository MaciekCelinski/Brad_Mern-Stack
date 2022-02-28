const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
	{
		name: {
			type: String,
			unique: true,
			required: [true, "Please add a name"],
		},
		email: {
			type: String,
			required: [true, "Please insert proper email address"],
			unique: [true, "This password has already been registered"],
		},
		password: {
			type: String,
			required: [true, "Please insert a password"],
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("User", userSchema);
