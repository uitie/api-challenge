const sqlite3 = require('sqlite3').verbose();

//connect to "trialdb" databse
const db = new sqlite3.Database('./trialdb.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the trialdb database.');
  db.run(`CREATE TABLE IF NOT EXISTS"users" (
		"UserID"	INTEGER NOT NULL UNIQUE,
		"Name"	TEXT NOT NULL,
		"Role"	TEXT NOT NULL CHECK("ROLE" = "producer" OR "ROLE" = "trainer"),
		"Password"	TEXT NOT NULL,
		"Picture"	BLOB NOT NULL,
		PRIMARY KEY("UserID" AUTOINCREMENT)
		)`),
  (err) => {
    if (err) {
      // Table already created
    }
  };
  db.run(`CREATE TABLE IF NOT EXISTS"workouts" (
			"Name"	TEXT NOT NULL,
			"Filming_date_time"	TEXT NOT NULL,
			"Filming_duration"	INTEGER NOT NULL,
			"Status"	TEXT NOT NULL,
			"UserID"	INTEGER NOT NULL,
			"Level"	TEXT NOT NULL,
			"WorkoutID"	INTEGER NOT NULL UNIQUE,
			FOREIGN KEY("UserID") REFERENCES "users"("UserID"),
			PRIMARY KEY("WorkoutID" AUTOINCREMENT)
		)`),
  (err) => {
    if (err) {
      // Table already created
    }
  };

});
	
/*
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
	}); */
	
module.exports = db;