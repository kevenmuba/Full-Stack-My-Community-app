// routes/users.routes.js

const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');

// Create a new user
router.post('/api/users', usersController.createUser);

// Login a user
router.post('/api/login', usersController.loginUser);

module.exports = router;