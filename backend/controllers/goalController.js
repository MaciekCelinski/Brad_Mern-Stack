const Goal = require("../models/goalModel");
const User = require('../models/userModel')

// @desc    Get goals
// @route   GET /api/goals
// @access  PRIVATE
const getGoals = async (req, res, next) => {
	try {
		// req.user <== we get that from the middleware 'protect' which checks
		// token for the id and send us the user details
		const goals = await Goal.find({user: req.user.id});
		res.status(200).json(goals);
	} catch (error) {
		next(Error(error))
		next(new Error("There are no goals to GET"));
	}
};

// @desc    Set goals
// @route   POST /api/goals
// @access  PRIVATE
const postGoal = async (req, res, next) => {
	if (!req.body) {
		throw new Error("Please add a text field");
	}
	// we get user in REQUEST from auth middleware (from token)
	try {
		const goal = await Goal.create({
			text: req.body.text,
			user: req.user.id
		});

		res.status(200).json(goal);
	} catch (error) {
		next(Error(error))
		next(new Error("Cannot create a goal object"));
	}
};

// @desc    Update goals
// @route   PUT /api/goals/:id
// @access  PRIVATE
const updateGoal = async (req, res, next) => {
	const goal = await Goal.findById(req.params.id);

	if (!goal) {
		res.status(400);
		next(new Error("Cannot find goal"));
	}

	try {

		const user = await User.findById(req.user.id)
		//check for user
		if(!user){
			res.status(401)
			 throw new Error('User not found')
		}
		// compare User ID from goal element with User ID from model
		if(goal.user.toString() !== user.id){
			res.status(401)
			throw new Error('User not authorized')
		}

		const updatedGoal = await Goal.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true }
		);
		res.status(200).json(updatedGoal);
	} catch (error) {
		next(Error(error));
		next(new Error("Cannot update goal"));
	}
};

// @desc    Delete goals
// @route   DELETE /api/goals/:id
// @access  PRIVATE
const deleteGoal = async (req, res, next) => {
	try {
		
		const user = await User.findById(req.user.id)
		//check for user
		if(!user){
			res.status(401)
			new Error('User not found')
		}
		// compare User ID from goal element with User ID from model
		if(goal.user.toString() !== user.id){
			res.status(401)
			new Error('User not authorized')
		}

		const goal = await Goal.findById(req.params.id);
		await goal.remove();
		res.status(200).json({ message: `DELETED goal ${req.params.id}` });
	} catch (error) {
		next(Error(error))
		next(new Error("Cannot delete goal"));
	}
};

module.exports = {
	getGoals,
	postGoal,
	updateGoal,
	deleteGoal,
};
