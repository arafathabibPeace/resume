const express = require('express');
const router = express.Router();
const companyController = require('../controllers/company.controller');

// Create a new user
router.post('/', companyController.create);

// Retrieve all users
router.get('/', companyController.findAll);

// Retrieve a single user with id
router.get('/:id', companyController.findById);

// Update a user with id
router.put('/', companyController.update);

// Delete a user with id
router.delete('/', companyController.delete);

module.exports = router