const User = require('../models/user.model');
const Account = require('../models/account.model');

// Create and Save a new User
exports.create = async (req, res) => {
    // Validate request
    if (!req.body) {
        return res.status(400).send({
            message: "Please fill all required field"
        });
    }
    // Create a new User
    const newObject = new User(req.body);
    // Save user in the database
    await newObject.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something went wrong while creating new user."
            });
        });
    const parentObject = await Account.findById({ _id: req.body.account });
    parentObject.users.push(newObject);
    await parentObject.save();

};

// Retrieve and return all users from the database.
exports.findAll = (req, res) => {
    User.find().populate({
        path: 'employees',
        select: '-user -__v',
        populate: {
            path: 'person_details contact_details employments',
            select: '-employees -__v',
            populate: {
                path: 'job skills employer',
                select: '-employment -__v'
            }
        }
    })
        .then(users => {
            res.send(users);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something went wrong while getting list of users."
            });
        });
};

// Find a single User with a id
exports.findOne = (req, res) => {
    User.findById(req.params.id).populate('employees')
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.id
                });
            }
            res.send(user);
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
    const user2 = {
        username: req.body.username,
        password: req.body.password,
        account: req.body.account
    }
    // Validate Request
    if (!req.body) {
        return res.status(400).send({
            message: "Please fill all required field"
        });
    }
    // Find user and update it with the request body
    User.findByIdAndUpdate(req.body.id, {
        user2
    }, { new: true })
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "user not found with id " + req.params.id
                });
            }
            res.send(user);
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
    User.findByIdAndDelete(req.body.id)
        .then(user => {
            if (!user) {
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