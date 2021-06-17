const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contact.controller');

// Create a new user
router.post('/', contactController.create);

// Retrieve all users
router.get('/', contactController.findAll);

// Retrieve a single user with id
router.get('/:id', contactController.findById);

// Update a user with id
router.put('/', contactController.update);

// Delete a user with id
router.delete('/', contactController.delete);

module.exports = router