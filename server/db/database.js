const sqlite3 = require('sqlite3').verbose();

//connect to "trialdb" databse
const db = new sqlite3.Database('./trialdb.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the trialdb database.');
});

const sqlQuery = 'SELECT * FROM users';
const params = [];
const selectUserTest = db.all(sqlQuery, params, (err, rows) => {
  if (err) {
    console.error(err);
    //res.status(400).json({'error':err.message});
    return;
  }
  const data = JSON.stringify(rows);
  console.log(data);
});

module.exports = db;