const User = require('../models/user.model');
const Account = require('../models/person.model');

// Create and Save a new User
exports.create = async (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Please fill all required field"
        });
    }
    const parentObject = await Account.findById({ _id: req.body.on_parent });
    if (!parentObject) {
        return res.status(404).send('Parent object is not found')
    }
    req.body.status = 'inactive';
    console.log(req.body)
    await User.create(req.body)
        .then(data => {
            return res.send(data);
        })
        .catch(err => {
            return res.send(err.message || 'Something went wrong.')
        })

};

// Retrieve and return all users from the database.
exports.findAll = (req, res) => {
    User.find().populate('on_parent')
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({ message: err.message || "Something went wrong." });
        });
};

// Find a single User with a id
exports.findOne = (req, res) => {
    User.findById(req.params.id).populate('on_parent')
        .then(data => {
            if (!data) {
                return res.status(404).send({ message: 'User id not found' });
            }
            res.send(user);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({ message: 'User id not found' });
            }
            return res.status(500).send({ message: "Something went wrong." });
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