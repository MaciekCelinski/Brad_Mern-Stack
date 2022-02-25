const express = require("express");

// import controller
const goalController = require("../controllers/goalController");

const router = express.Router();

router.route("/").get(goalController.getGoals).post(goalController.postGoal);

router
  .route("/:id")
  .put(goalController.putGoal)
  .delete(goalController.deleteGoal);

// // GET
// router.get("/", goalController.getGoals);

// // POST
// router.post("/", goalController.postGoal);

// // PUT
// router.put("/:id", goalController.putGoal);

// // DELETE
// router.delete("/:id", goalController.deleteGoal);

module.exports = router;
