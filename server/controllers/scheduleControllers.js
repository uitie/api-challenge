const db = require('../db/database.js');
const scheduleController = {};

function addWorkout(req, res, next) {
  const params = [req.body.name, req.body.filming_date_time, req.body.filming_duration, req.body.status, req.body.userID, req.body.level];
  const sql = 'INSERT INTO workouts (name, filming_date_time, filming_duration, status, userID, level) VALUES (?,?,?,?,?,?)';
    
  db.run(sql, params, function(err) {
    if (err) {
      res;
      return console.error(err.message);
    }
    res.json({
      'message': 'success',
      'data': data,
      'id' : this.lastID
    });
    console.log(`Rows inserted ${this.changes}`);
  });
    
  return next();
};