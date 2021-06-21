const Employee = require('../models/employee.model');
const User = require('../models/user.model');

const employeeController = {
    create: async (req, res) => {

        if (!req.body) {
            res.status(400).send({ message: 'Please fill all required field' })
        }
        const parentObject = await User.findById({ _id: req.body.user });
        if (!parentObject) {
            return res.status(400).send('Employment id is not found')
        }
        const newObject = new Employee(req.body);
        await newObject.save()
            .then(data => {
                return res.send(data);
            }).catch(err => { //this return error message if there is error in User.findById({ _id: req.body.user })
                return res.status(500).send(err.message || 'Something went wrong');
            })

        parentObject.employees.push(newObject);
        await parentObject.save();
    },

    findAll: async (req, res) => {
        await Employee.find()
            .populate('objectives', '-employee -__v')
            .populate('person_details', '-employee -__v')
            .populate('contact_details', '-employee -__v')
            .populate('skills', '-employee -__v')
            .populate({
                path: 'employments',
                select: '-employee -__v',
                populate: {
                    path: 'job employer',
                    select: '-employment -__v'
                }
            })
            .then(data => {
                return res.send(data);
            }).catch(err => {
                return res.status(500).send(err.message || 'Something went wrong');
            })
    },
    findById: async (req, res) => {
        await Employee.findById(req.params.id)
            .populate('objectives', '-employee -__v')
            .populate('person_details', '-employee -__v')
            .populate('contact_details', '-employee -__v')
            .populate('skills', '-employee -__v')
            .populate({ path: 'employments', select: '-employee -__v', populate: { path: 'job', select: '-employment -__v' } })
            .then(data => {
                if (!data) {
                    return res.status(404).send('Employee id does not found');
                }
                return res.send(data);
            }).catch(err => {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send('Employee id does not found')
                }
                return res.status(500).send(err.message || 'Something went wrong');
            })
    },
    update: async (req, res) => {
        if (!req.body) {
            res.status(400).send({ message: 'Please fill all required field' })
        }

        await Employee.findByIdAndUpdate(req.body.id, req.body, { new: true })
            .then(data => {
                if (!data) {
                    res.status(404).send('Employee id does not exist');
                }
                res.send(data);
            }).catch(err => {
                if (err.kind === 'ObjectId') {
                    res.status(404).send('Employee id does not exist')
                }
                res.status(500).send('Employee id does not exist')
            })

    },
    delete: async (req, res) => {
        await Employee.findByIdAndDelete(req.body.id)
            .then(data => {
                if (!data) {
                    return res.status(404).send('Employee id not found')
                }
                return res.send(data);
            }).catch(err => {
                if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                    return res.status(404).send("user not found with id " + req.body.id);
                }
                return res.status(500).send(err.message || 'Something went wrong');
            })

    }
}
module.exports = employeeController;