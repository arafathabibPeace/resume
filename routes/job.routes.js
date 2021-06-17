const express = require('express');
const router = express.Router();
const jobController = require('../controllers/job.controller');

// Create a new user
router.post('/', jobController.create);

// Retrieve all users
router.get('/', jobController.findAll);

// Retrieve a single user with id
router.get('/:id', jobController.findById);

// Update a user with id
router.put('/', jobController.update);

// Delete a user with id
router.delete('/', jobController.delete);

module.exports = router