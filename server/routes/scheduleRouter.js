const { Router } = require('express');
const { addWorkout, getWorkouts, updateWorkout } = require('../controllers/scheduleController.js');
const scheduleRouter = Router(); 



scheduleRouter.post('/addWorkout', addWorkout, (req, res) => {
  console.log('addWorkout router firing');
  res.status(200).json(res.body.workout);
});

scheduleRouter.get('/getWorkouts', getWorkouts, (req, res) => {
  console.log('getWorkouts router firing');
  res.status(200).json(res.body.workouts);
});

scheduleRouter.post('/updateWorkout', updateWorkout, (req, res) => {
  console.log('updateWorkout router firing');
  res.status(200).json(res.body.updateWorkout);
});

module.exports = scheduleRouter;