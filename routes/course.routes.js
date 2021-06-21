const express = require('express');
const router = express.Router();
const courseController = require('../controllers/course.controller');

// Create a new user
router.post('/', courseController.create);

// Retrieve all users
router.get('/', courseController.findAll);

// Retrieve a single user with id
router.get('/:id', courseController.findById);

// Update a user with id
router.put('/', courseController.update);

// Delete a user with id
router.delete('/', courseController.delete);

module.exports = router