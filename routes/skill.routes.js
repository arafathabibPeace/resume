const express = require('express');
const router = express.Router();
const skillController = require('../controllers/skill.controller');

// Create a new user
router.post('/', skillController.create);

// Retrieve all users
router.get('/', skillController.findAll);

// Retrieve a single user with id
router.get('/:id', skillController.findById);

// Update a user with id
router.put('/', skillController.update);

// Delete a user with id
router.delete('/', skillController.delete);

module.exports = router