const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employee.controller');

// Create a new user
router.post('/', employeeController.create);

// Retrieve all users
router.get('/', employeeController.findAll);

// Retrieve a single user with id
router.get('/:id', employeeController.findOneById);

// Update a user with id
router.put('/', employeeController.update);

// Delete a user with id
router.delete('/', employeeController.delete);

module.exports = router