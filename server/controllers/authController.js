const db = require('../db/database.js');

function login(req, res, next){
  const data = {
    username: req.body.userID,
    password: req.body.password
  };
  const sql = 'SELECT userID, password FROM users WHERE userID = ?';
  let isAuthorized = false;


  //check supplied credentials against those in db
  db.all(sql, data.username, (err, rows) => {
    if (err) {
      console.error(err);
      res.status(400).json({'error':err.message});
      return;
    }
		
    if(( rows[0].UserID === data.username ) && ( rows[0].Password === data.password )){
      isAuthorized = true;
    }
    res.body = {
      'authStatus': isAuthorized
    };
    console.log(isAuthorized);
    
    return next();
  });
}

module.exports = {
  login
};