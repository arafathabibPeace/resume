const express = require('express');
const router = express.Router()
const { verifyUserToken, IsAdmin, IsUser } = require("../middleware/auth");
const userController = require('../controllers/user.controller');

// Register or Create a new user
router.post('/', userController.create);

//Login
router.post('/login', userController.login);

// Auth user only
router.get('/events', verifyUserToken, IsUser, userController.userEvent);

// Auth Admin only
router.get('/special', verifyUserToken, IsAdmin, userController.adminEvent);

//Logout
router.post('/logout', userController.logout);

// Retrieve all users
router.get('/', userController.findAll);

// Retrieve a single user with id
router.get('/:id', userController.findOne);

// Update a user with id
router.put('/', userController.update);

// Delete a user with id
router.delete('/', userController.delete);
module.exports = router