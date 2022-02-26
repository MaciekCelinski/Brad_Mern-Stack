const Goal = require("../models/goalModel");

// @desc    Get goals
// @route   GET /api/goals
// @access  PRIVATE
const getGoals = async (req, res, next) => {
	try {
		const goals = await Goal.find();
		res.status(200).json(goals);
	} catch (error) {
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

	try {
		const goal = await Goal.create({
			text: req.body.text,
		});

		res.status(200).json(goal);
	} catch (error) {
		next(new Error("Cannot create a goal object"));
	}
};

// @desc    Update goals
// @route   PUT /api/goals/:id
// @access  PRIVATE
const putGoal = async (req, res, next) => {
	const goal = await Goal.findById(req.params.id);

	if (!goal) {
		res.status(400);
		next(new Error("Cannot find goal"));
	}

	try {
		const updatedGoal = await Goal.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true }
		);
		res.status(200).json(updatedGoal);
	} catch (error) {
		next(new Error("Cannot update goal"));
	}
};

// @desc    Delete goals
// @route   DELETE /api/goals/:id
// @access  PRIVATE
const deleteGoal = async (req, res, next) => {
	try {
		const goal = await Goal.findById(req.params.id);
		await goal.remove();
		res.status(200).json({ message: `DELETED goal ${req.params.id}` });
	} catch (error) {
		next(new Error("Cannot delete goal"));
	}
};

module.exports = {
	getGoals,
	postGoal,
	putGoal,
	deleteGoal,
};
