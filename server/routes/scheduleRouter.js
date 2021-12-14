const { Router } = require('express');
const { addWorkout, getWorkouts } = require('../controllers/scheduleController.js');
const scheduleRouter = Router(); 



scheduleRouter.post('/addWorkout', addWorkout, (req, res) => {
  console.log('addWorkout router firing');
  res.status(200).json(res.body.workout);
});

scheduleRouter.get('/getWorkouts', getWorkouts, (req, res) => {
  console.log('getWorkout router firing');
  res.status(200).json(res.body.workouts);
});

module.exports = scheduleRouter;