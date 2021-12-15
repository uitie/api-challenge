const db = require('../db/database.js');


function addWorkout(req, res, next) {
  const data = {
    name: req.body.name,
    filming_date_time: req.body.filming_date_time,
    filming_duration: req.body.filming_duration,
    status: req.body.status,
    userID: req.body.userID,
    level: req.body.level
  };
  
  const sql = 'INSERT INTO workouts (name, filming_date_time, filming_duration, status, userID, level) VALUES (?,?,?,?,?,?)';
  const params = [data.name, data.filming_date_time, data.filming_duration, data.status, data.userID, data.level];

  console.log(sql);
  db.run(sql, params, function(err, result) {
    if (err) {
      res;
      return console.error(err.message);
    }

    res.body = {
      'workout': data
    };
    console.log(`Rows inserted ${this.changes}`);
    return next();
  });
  
};

function getWorkouts(req, res, next) {
  const sqlQuery = 'SELECT * FROM workouts';
  db.all(sqlQuery, params = [], (err, rows) => {
    if (err) {
      console.error(err);
      res.status(400).json({'error':err.message});
      return;
    }
    console.log(rows);
    res.body = {
      'workouts': rows
    };
    return next();
  });
  
};
  
  
module.exports = {
  addWorkout,
  getWorkouts,
};
  
  