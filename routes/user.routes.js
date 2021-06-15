const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controller');

// Retrieve all users
router.get('/', userController.findAll);

// Create a new user
router.post('/', userController.create);

// Retrieve a single user with id
router.get('/:id', userController.findOne);

// Retrieve all users by account
router.get('/account/user/:id', userController.findByAccount);

// Update a user with id
router.put('/:id', userController.update);

// Delete a user with id
router.delete('/:id', userController.delete);
module.exports = router