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


module.exports = {
  addWorkout,
};