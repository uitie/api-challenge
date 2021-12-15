const db = require('../db/database.js');

function addWorkout(req, res, next) {
  const data = {
    name: req.body.name,
    filming_date_time: req.body.filming_date_time,
    filming_duration: req.body.filming_duration,
    status: req.body.status,
    userID: req.body.userID,
    level: req.body.level
  }
  const sql = 'INSERT INTO workouts (name, filming_date_time, filming_duration, status, userID, level) VALUES (?,?,?,?,?,?)';
  const params = [data.name, data.filming_date_time, data.filming_duration, data.status, data.userID, data.level];

  //hardcoded query
 /*  const sqlTest = 'INSERT INTO workouts (name, filming_date_time, filming_duration, status, userID, level) VALUES ("HIIT Ultimate", "2021-12-14T14:24:30+0000", 60, "planned", 1, "Intermediate")'; */
  
  console.log(sql);
  db.run(sql, params, function(err, result) {
    if (err) {
      res;
      return console.error(err.message);
    }
    //console.log(data, req.body);
    /* res.json({
      "message": "success",
      "data": data,
      "id" : this.lastID
    }); */
    res.body = {
      "workout": data
    }
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
      "workouts": rows,
    };
    return next();
  });
};
  
  
module.exports = {
  addWorkout,
  getWorkouts,
};
  
  