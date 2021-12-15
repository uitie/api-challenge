const { Router } = require('express');
const { addWorkout, getWorkouts, updateWorkout, searchWorkouts, getTrainer } = require('../controllers/scheduleController.js');
const scheduleRouter = Router(); 



scheduleRouter.post('/addWorkout', addWorkout, (req, res) => {
  console.log('addWorkout router firing');
  res.status(200).json(res.body.workout);
});

scheduleRouter.post('/updateWorkout', updateWorkout, (req, res) => {
  console.log('updateWorkout router firing');
  res.status(200).json(res.body.statusChange);
});

scheduleRouter.get('/getWorkouts', getWorkouts, (req, res) => {
  console.log('getWorkouts router firing');
  res.status(200).json(res.body.workouts);
});

scheduleRouter.get('/searchWorkouts', searchWorkouts, (req, res) => {
  console.log('searchWorkouts router firing');
  res.status(200).json(res.body.workouts);
});

scheduleRouter.get('/getTrainer', getTrainer, (req, res) => {
  console.log('getTrainer router firing');
  res.status(200).json(res.body.trainer);
});

module.exports = scheduleRouter;