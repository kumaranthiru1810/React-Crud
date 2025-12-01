const usercontrols = require('../controller/userControl');
// const { registerUser } = require('./controllers/userController');
const express = require('express');
const router = express.Router();

router.post('/register' , usercontrols.registerUser);
router.post('/login' , usercontrols.loginUser);
router.get('/' , usercontrols.getusers);
router.get('/users/:id' , usercontrols.getparusers);
router.put('/edituser/:id' , usercontrols.updateusers);

module.exports=router;
