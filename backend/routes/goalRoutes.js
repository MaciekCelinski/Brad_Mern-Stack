const express = require("express");

// import controller
// const goalController = require("../controllers/goalController");
const {
  getGoals,
  postGoal,
  updateGoal,
  deleteGoal,
} = require("../controllers/goalController");

const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getGoals).post(protect, postGoal);

router.route("/:id").put(protect, updateGoal).delete(protect, deleteGoal);

// // GET
// router.get("/", goalController.getGoals);

// // POST
// router.post("/", goalController.postGoal);

// // PUT
// router.put("/:id", goalController.putGoal);

// // DELETE
// router.delete("/:id", goalController.deleteGoal);

module.exports = router;
