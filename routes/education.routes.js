const express = require('express');
const router = express.Router();
const educationController = require('../controllers/education.controller');

// Create a new user
router.post('/', educationController.create);

// Retrieve all users
router.get('/', educationController.findAll);

// Retrieve a single user with id
router.get('/:id', educationController.findById);

// Update a user with id
router.put('/', educationController.update);

// Delete a user with id
router.delete('/', educationController.delete);

module.exports = router