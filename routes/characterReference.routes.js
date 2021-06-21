const express = require('express');
const router = express.Router();
const characterReferenceController = require('../controllers/characterReference.controller');

// Create a new user
router.post('/', characterReferenceController.create);

// Retrieve all users
router.get('/', characterReferenceController.findAll);

// Retrieve a single user with id
router.get('/:id', characterReferenceController.findById);

// Update a user with id
router.put('/', characterReferenceController.update);

// Delete a user with id
router.delete('/', characterReferenceController.delete);

module.exports = router