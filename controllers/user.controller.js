const User = require('../models/user.model');
const Account = require('../models/account.model');
const config = require("../config/jwt.config");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
// Create and Save a new User
exports.create = async (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Please fill all required field"
        });
    }
    const parentObject = await Account.findById({ _id: req.body.foreign_id });
    if (!parentObject) {
        return res.status(404).send('Parent object is not found')
    }

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
        email: req.body.email,
        username: req.body.username,
        password: hashPassword,
        foreign_id: req.body.foreign_id,
        onModel: 'Account'
    })
    await User.create(newUser)
        .then(data => {
            //console.log(data)
            // const payload = { id: data._id, user_type_id: data.foreign_id || 0 };
            // const accessToken = jwt.sign(payload, config.TOKEN_SECRET);
            //const refreshToken = jwt.sign(payload, config.REFRESH_TOKEN_SECRET);
            //config.refresh_tokens.push(refreshToken);
            return res.send('User Created!');
            //return res.send(accessToken, refreshToken);
        })
        .catch(err => {
            return res.send(err.message || 'Something went wrong.')
        })
};

exports.login = async (req, res) => {

    User.findOne({ email: req.body.email }, async (err, user) => {
        if (err) {
            console.log(err)
        } else {
            if (user) {
                const validPass = await bcrypt.compare(req.body.password, user.password);
                if (!validPass) return res.status(401).send("Mobile/Email or Password is wrong");

                // Create and assign token
                const payload = { id: user._id, user_type_id: user.foreign_id };
                const accessToken = jwt.sign(payload, config.TOKEN_SECRET, { expiresIn: '1m' });
                const refreshToken = jwt.sign(payload, config.REFRESH_TOKEN_SECRET)
                config.REFRESH_TOKENS.push(refreshToken);

                res.status(200).header("auth-token", accessToken).send({ "access token": accessToken, "refresh token": refreshToken });
            }
            else {
                res.status(401).send('Invalid mobile')
            }

        }
    })
}

exports.logout = (req, res) => {
    console.log('Logout: ', config.REFRESH_TOKENS)
    // const { token } = req.headers;
    // config.refresh_tokens = config.refresh_tokens.filter(t => t !== token);

    res.send("Logout successful");
}

// Access auth users only
exports.userEvent = (req, res) => {
    let events = [
        {
            "_id": "1",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "2",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "3",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        }
    ]
    res.json(events)
};

exports.adminEvent = (req, res) => {
    let specialEvents = [
        {
            "_id": "1",
            "name": "Auto Expo Special",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "2",
            "name": "Auto Expo Special",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "3",
            "name": "Auto Expo Special",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "4",
            "name": "Auto Expo Special",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "5",
            "name": "Auto Expo Special",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "6",
            "name": "Auto Expo Special",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        }
    ]
    res.json(specialEvents)

}

// Retrieve and return all users from the database.
exports.findAll = (req, res) => {
    User.find().populate('foreign_id')
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({ message: err.message || "Something went wrong." });
        });
};

// Find a single User with a id
exports.findOne = (req, res) => {
    User.findById(req.params.id).populate('foreign_id')
        .then(data => {
            if (!data) {
                return res.status(404).send({ message: 'User id not found' });
            }
            res.send(data);
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