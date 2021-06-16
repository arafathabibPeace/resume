const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controller');

// Create a new user
router.post('/', userController.create);

// Retrieve all users
router.get('/', userController.findAll);

// Retrieve a single user with id
router.get('/:id', userController.findOne);

// Update a user with id
router.put('/', userController.update);

// Delete a user with id
router.delete('/', userController.delete);
module.exports = router