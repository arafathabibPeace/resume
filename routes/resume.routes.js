const express = require('express');
const router = express.Router();
const resumeController = require('../controllers/resume.controller');

// Create a new user
router.post('/', resumeController.create);

// Retrieve all users
router.get('/', resumeController.findAll);

// Retrieve a single user with id
router.get('/:id', resumeController.findById);

// Update a user with id
router.put('/', resumeController.update);

// Delete a user with id
router.delete('/', resumeController.delete);

module.exports = router