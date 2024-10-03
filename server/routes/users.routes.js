// routes/users.routes.js

const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');

// Create a new user
router.post('/api/users', usersController.createUser);

// Login a user
router.post('/api/login', usersController.loginUser);

// Forgot password route
router.post('/api/forgot-password', usersController.forgotPassword);

// Reset password route
router.post('/api/reset-password', usersController.resetPassword);

// Get all users
router.get('/api/users', usersController.getAllUsers);

// Get all users except customers
 router.get('/api/users/exclude-customers', usersController.getUsersExceptCustomers);

// Get only customers
router.get('/api/users/customers', usersController.getOnlyCustomers);

// Get a user by ID
router.get('/api/users/:id', usersController.getUserById);

// Update a user
router.put('/api/users/:id', usersController.updateUser);

// Delete a user
router.delete('/api/users/:id', usersController.deleteUser);




module.exports = router;