const express = require('express');
const router = express.Router();
const employmentController = require('../controllers/employment.controller');

// Create a new user
router.post('/', employmentController.create);

// Retrieve all users
router.get('/', employmentController.findAll);

// Retrieve a single user with id
router.get('/:id', employmentController.findById);

// Update a user with id
router.put('/', employmentController.update);

// Delete a user with id
router.delete('/', employmentController.delete);

module.exports = router