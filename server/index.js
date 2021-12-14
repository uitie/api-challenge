require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');

 
app.get('/', function (req, res) {
  res.send('Hello World');
});

module.exports = app;
