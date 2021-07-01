const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profile.controller');

// Create a new profile
router.post('/', profileController.create);

// Retrieve all profile
router.get('/', profileController.findAll);

// Retrieve a single profile with id
//router.get('/:id', profileController.findById);

// Retrieve a single profile with id
router.get('/:profilename', profileController.findByProfilename);

// Update a profile with id
router.put('/', profileController.update);

// Delete a profile with id
router.delete('/', profileController.delete);

module.exports = router