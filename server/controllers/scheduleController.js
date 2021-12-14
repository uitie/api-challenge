const db = require('../db/database.js');

function addWorkout(req, res, next) {
  const params = [req.body.Name, req.body.filming_date_time, req.body.filming_duration, req.body.status, req.body.userID, req.body.level];
  const sql = 'INSERT INTO workouts (name, filming_date_time, filming_duration, status, userID, level) VALUES (?,?,?,?,?,?)';
  //const data = JSON.stringify(reb.body);
  
  console.log(data);
  db.run(sql, params, function(err) {
    if (err) {
      res;
      return console.error(err.message);
    }
    
    res.locals.workout = data;
    console.log(`Rows inserted ${this.changes}`);
  });
  
  return next();
};

function getWorkouts(req, res, next) {
  const sqlQuery = 'SELECT * FROM users';
  db.all(sqlQuery, params = [], (err, rows) => {
    if (err) {
      console.error(err);
      res.status(400).json({'error':err.message});
      return;
    }
    res.body.workouts = rows;
  });
  return next();
};
  
  
module.exports = {
  addWorkout,
  getWorkouts,
};
  
  