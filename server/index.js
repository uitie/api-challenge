require('dotenv').config({path:__dirname+'../.env'});
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


//stndard route handler
app.get('/', function (req, res) {
  res.send('Hello World');
});


console.log(PORT);
//initialize server
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

module.exports = app;
