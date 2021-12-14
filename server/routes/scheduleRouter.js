const express = require('express'); 
const scheduleRouter = express.Router(); 
const scheduleControllers = require('../controllers/scheduleControllers.js');


scheduleRouter.post('/addWorkout', scheduleControllers.addWorkout, (req, res) => {
  console.log('addWorkout router firing');
  res.status(200).json(res.locals.workout);
});

scheduleRouter.get('/getWorkouts', scheduleControllers.getWorkouts, (req, res) => {
  console.log('getWorkout router firing');
  res.status(200).json(res.locals.workouts);
});

module.exports = scheduleRouter;