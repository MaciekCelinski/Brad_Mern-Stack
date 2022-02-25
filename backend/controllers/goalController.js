// @desc    Get goals
// @route   GET /api/goals

const { message } = require("statuses");

// @access  PRIVATE
const getGoals = (req, res) => {
  res.status(200).json({ message: "GET all goals" });
};

// @desc    Set goals
// @route   POST /api/goals
// @access  PRIVATE
const postGoal = (req, res) => {
  console.log("req.body: ", req.body);
  if (!req.body) {
    // res.status(400).json({ message: "Please add a text field" });
    throw new Error('Please add a text field')
  } else {
    res.status(200).json({ message: req.body.text });
  }
};

// @desc    Update goals
// @route   PUT /api/goals/:id
// @access  PRIVATE
const putGoal = (req, res) => {
  res.status(200).json({ message: `UPDATE goal ${req.params.id}` });
};

// @desc    Delete goals
// @route   DELETE /api/goals/:id
// @access  PRIVATE
const deleteGoal = (req, res) => {
  res.status(200).json({ message: `DELETE goal ${req.params.id}` });
};

module.exports = {
  getGoals,
  postGoal,
  putGoal,
  deleteGoal,
};
