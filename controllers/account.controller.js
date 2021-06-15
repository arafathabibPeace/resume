const Account = require('../models/account.model.js');

// const AccountController = {
//     create: async (req, res) => {
//         const newAccount = new Account(req.body);
//         const savedAccount = await newAccount.save();
//         res.json(savedAccount);
//     },
//     findAll: async (req, res) => {
//         const found = await Account.find();
//         res.json(found);
//     },
//     findOne: async (req, res) => {
//         const found = await Account.findById(req.params.id);
//         res.json(found)
//     },
//     update: async (req, res) => {
//         const updateAccount = await Account.findByIdAndUpdate(req.body.id, req.body);
//         res.json(updateAccount);
//     },
//     delete: async (req, res) => {
//         const deleteAccount = await Account.findByIdAndRemove(req.body.id);
//         res.json(deleteAccount);
//     }
// }
// module.exports = AccountController;

// Retrieve and return all users from the database.
exports.findAll = async (req, res) => {
    await Account.find().populate('users')
        .then(account => {
            res.send(account);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something went wrong while getting list of users."
            });
        });
};
// Create and Save a new User
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        return res.status(400).send({
            message: "Please fill all required field"
        });
    }
    // Create a new User
    const account = new Account(req.body);
    // Save user in the database
    account.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something went wrong while creating new user."
            });
        });
};
// Find a single User with a id
exports.findOne = (req, res) => {
    Account.findById(req.params.id).populate('users')
        .then(account => {
            if (!account) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.id
                });
            }
            res.send(account);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "User not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error getting user with id " + req.params.id
            });
        });
};
// Update a User identified by the id in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        return res.status(400).send({
            message: "Please fill all required field"
        });
    }
    // Find user and update it with the request body
    Account.findByIdAndUpdate(req.body.id, {
        account_name: req.body.account_name,
        account_description: req.body.account_description,
    }, { new: true })
        .then(account => {
            if (!account) {
                return res.status(404).send({
                    message: "user not found with id " + req.params.id
                });
            }
            res.send(account);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "user not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error updating user with id " + req.params.id
            });
        });
};
// Delete a User with the specified id in the request
exports.delete = (req, res) => {
    Account.findByIdAndRemove(req.body.id)
        .then(account => {
            if (!account) {
                return res.status(404).send({
                    message: "user not found with id " + req.params.id
                });
            }
            res.send({ message: "user deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "user not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Could not delete user with id " + req.params.id
            });
        });
};