const express = require('express'); 
const scheduleRouter = express.Router(); 
const scheduleController = require('../controllers/scheduleController.js');


scheduleRouter.post('/addWorkout', scheduleController.addWorkout, (req, res) => {
  console.log('addWorkout router firing');
  res.status(200).json(res.locals.workout);
});

scheduleRouter.get('/getWorkouts', scheduleController.getWorkouts, (req, res) => {
  console.log('getWorkout router firing');
  res.status(200).json(res.locals.workouts);
});

module.exports = scheduleRouter;