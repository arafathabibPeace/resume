const express = require('express');
const router = express.Router();
const dateController = require('../controllers/date.controller');

// Create a new user
router.post('/', dateController.create);

// Retrieve all users
router.get('/', dateController.findAll);

// Retrieve a single user with id
router.get('/:id', dateController.findById);

// Update a user with id
router.put('/', dateController.update);

// Delete a user with id
router.delete('/', dateController.delete);

module.exports = router