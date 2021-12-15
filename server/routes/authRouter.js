const { Router } = require('express');
const { login } = require('../controllers/authController.js');
const authRouter = Router(); 



authRouter.get('/login', login, (req, res) => {
  console.log('login router firing');
  res.status(200).json(res.body.authStatus);
});

module.exports = authRouter;