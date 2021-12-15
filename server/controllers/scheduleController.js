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
  
  db.run(sql, params, function(err) {
    if (err) {
      return console.error(err.message);
    }
    
    res.body = {
      'workout': data
    };
    console.log(`Rows inserted ${this.changes}`);
    return next();
  });
  
}

function updateWorkout(req, res, next){
  //input validation
  if(!req.body.workoutID){
    console.log('must include workoutID in request body');
    throw error;
  }
  const data = {
    workoutID: req.body.workoutID,
    status: req.body.status
  };
  const sql = `UPDATE workouts 
  SET status = ? 
  WHERE workoutID = ?`;
  
  db.run(sql, [data.status, data.workoutID], function(err) {
    if (err) {
      return console.error(err.message);
    }
    res.body = {
      'statusChange': {
        'workoutID': data.workoutID,
        'status': data.status
      }
    };
    console.log(`Row(s) updated ${this.changes}`);
    return next();
  });
  
}

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
  
}

function searchWorkouts(req, res, next) {
  //initial input validation
  if(( !req.body.workoutID )){
    const errMsg = 'Please include the workoutID of the workout that you\'re looking for. \n If you\'d like a filtered list of workouts, please set the workoutID property to "none" within the body of your request.';
    
    console.error({error: errMsg});
    res.status(400).json({'error': errMsg});
    
    return;
  }
  
  // eslint-disable-next-line quotes
  let sqlQuery = ``;
  const data = {
    workoutID: req.body.workoutID,
    filterName: req.body.filterName,
    filterVal: req.body.filterVal
  };
  
  //keeping things DRY
  function dbSearchFunc(sqlQuery){
    db.all(sqlQuery, data.filterVal || data.workoutID, (err, rows) => {
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
  
  //return specific workout based on workoutID
  if(data.workoutID !== 'none' && data.workoutID >= 1) {
    //data.filterVal = data.workoutID;
    sqlQuery = 'SELECT * FROM workouts WHERE workoutID = ? ORDER BY filming_date_time';
    dbSearchFunc(sqlQuery);
    
    //code continues executing past this scope wiithout this return statement
    return;
  }
  
  //input validation for filter operations
  if(( !req.body.filterName || !req.body.filterVal )){
    const errMsg = 'Please set the value of the <filterName> property in the body of your request to one of the following: "Name", "Filming_date_time", "Filming_duration", "Status", "Level", or "Trainer". Set the <filterVal> property to match the reults you\'d like to see. (Example: <filterName: trainer> and <filterVal: Mark> will show all workouts that have been assigned to Mark.';
    
    console.error({error: errMsg});
    res.status(400).json({'error': errMsg});
    
    return;
  }
  
  //filter by workout name
  if(data.filterName === 'Name') {
    sqlQuery = 'SELECT * FROM workouts WHERE name = ? ORDER BY filming_date_time';
    dbSearchFunc(sqlQuery);
    
    //filter by scheduled date & time
  } else if(data.filterName === 'Filming_date_time') {
    sqlQuery = 'SELECT * FROM workouts WHERE filming_date_time = ? ORDER BY filming_date_time';
    dbSearchFunc(sqlQuery);
    
    //filter by filming duration
  } else if(data.filterName === 'Filming_duration') {
    sqlQuery = 'SELECT * FROM workouts WHERE filming_duration = ? ORDER BY filming_date_time';
    dbSearchFunc(sqlQuery);
    
    //filter by shoot status
  } else if(data.filterName === 'Status') {
    sqlQuery = 'SELECT * FROM workouts WHERE status = ?';
    dbSearchFunc(sqlQuery);
    
    //filter by workout defficulty level
  } else if(data.filterName === 'Level') {
    sqlQuery = 'SELECT * FROM workouts WHERE level = ? ORDER BY filming_date_time';
    dbSearchFunc(sqlQuery);
    
    //filter by name of trainer
  } else if(data.filterName === 'Trainer') {
    //additional input validation
    if(typeof data.filterVal !== 'string'){
      console.error({error: 'The "filterVal" corresponding to "filterName: Trainer" must be the name of the Trainer'});
      throw error;
    }
    sqlQuery = 'SELECT * FROM workouts LEFT JOIN users USING (userID) WHERE users.name = ? ORDER BY filming_date_time';
    dbSearchFunc(sqlQuery);
  }
  
}

function getTrainer(req, res, next) {
  //input validation
  if(( !req.body.userID )){
    const errMsg = 'Please include the userID of the trainer that you\'re looking for. \n Trainer ID\'s can be found by visiting the "/workouts/getWorkouts" route.';
    
    console.error({error: errMsg});
    res.status(400).json({'error': errMsg});
    
    return;
  }
  
  // eslint-disable-next-line quotes
  const sqlQuery = 'SELECT users.name AS Trainer, filming_date_time, workouts.name, workoutID, status, level, users.picture AS Trainer_Photo FROM workouts INNER JOIN users USING (userID) WHERE users.userID = ? ORDER BY filming_date_time';
  const data = {
    userID: req.body.userID
  };
  
  db.all(sqlQuery, data.userID, (err, rows) => {
    if (err) {
      console.error(err);
      res.status(400).json({'error':err.message});
      return;
    }
    console.log(rows);
    
    //need to convert photo from current array buffer to base64 string in order to view in browser via DOM manipulation or write to file system
    res.body = {
      'trainer': rows
    };

    return next();
  });

}


module.exports = {
  addWorkout,
  updateWorkout,
  getWorkouts,
  searchWorkouts,
  getTrainer
};

