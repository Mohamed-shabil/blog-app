const express = require('express');

const router = express.Router();

const {signin,signup,logout, currentUser} = require('../controller/authController');

router.post('/api/users/signup',signup);

router.get('/api/users/currentUser',currentUser);

router.post('/api/users/signin',signin);

router.get('/api/users/logout',logout);


module.exports = router