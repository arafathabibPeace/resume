const express = require('express')
const router = express.Router()
const accountController = require('../controllers/account.controller');

// Retrieve all users
router.get('/', accountController.findAll);

// Create a new user
router.post('/', accountController.create);

// Retrieve a single user with id
router.get('/:id', accountController.findOne);

// Update a user with id
router.put('/', accountController.update);

// Delete a user with id
router.delete('/', accountController.delete);
module.exports = router