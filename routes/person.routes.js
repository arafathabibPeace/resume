const express = require('express');
const router = express.Router();
const personController = require('../controllers/person.controller');

// Create a new user
router.post('/', personController.create);

// Retrieve all users
router.get('/', personController.findAll);

// Retrieve a single user with id
router.get('/:id', personController.findById);

// Retrieve a single person with user id
router.get('/user/:user', personController.findByUserId);

// Update a user with id
router.put('/', personController.update);

// Delete a user with id
router.delete('/', personController.delete);

module.exports = router