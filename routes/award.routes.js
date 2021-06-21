const express = require('express');
const router = express.Router();
const awardController = require('../controllers/award.controller');

// Create a new user
router.post('/', awardController.create);

// Retrieve all users
router.get('/', awardController.findAll);

// Retrieve a single user with id
router.get('/:id', awardController.findById);

// Update a user with id
router.put('/', awardController.update);

// Delete a user with id
router.delete('/', awardController.delete);

module.exports = router