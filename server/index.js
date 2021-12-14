require('dotenv').config({path:__dirname + '../.env'});
const express = require('express');
const app = express();
const fetch = require('node-fetch');
const path = require('path');
const { dirname } = require('path');
//const { fileURLToPath } = require('url');
//const __filename = fileURLToPath(import.meta.url);
//const __dirname = dirname();
const PORT = 4000;

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//default route handler
app.get('/', function (req, res) {
  res.send('Hello World');
});

//routers



//global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express global error handler caught unknown middleware error',
    status: err.status || 500,
    message: err.message || { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  return res.status(errorObj.status).json(errorObj.message);
});

console.log(PORT);
//initialize server
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

module.exports = app;
