const express = require('express');
const router = express.Router();
const objectiveController = require('../controllers/objective.controller');

// Create a new user
router.post('/', objectiveController.create);

// Retrieve all users
router.get('/', objectiveController.findAll);

// Retrieve a single user with id
router.get('/:id', objectiveController.findById);

// Update a user with id
router.put('/', objectiveController.update);

// Delete a user with id
router.delete('/', objectiveController.delete);

module.exports = router