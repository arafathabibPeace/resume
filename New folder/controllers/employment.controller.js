const Employment = require('../models/employment.model');
const Employee = require('../models/employee.model');

const employmentController = {

    create: async (req, res) => {
        const parentObject = await Employee.findById({ _id: req.body.employee });
        if (!parentObject) {
            return res.status(400).send('Employee id is not found')
        }
        const newObject = new Employment(req.body);
        await newObject.save()
            .then(data => {
                return res.send(data);
            }).catch(err => {
                return res.status(500).send(err.message || 'Something went wrong');
            });
        parentObject.employments.push(newObject);
        await parentObject.save();
    },
    findAll: async (req, res) => {
        await Employment.find()
            .populate({ path: 'job dates skills employer contact_details', select: '-employment -__v' })
            .then(data => {
                return res.send(data);
            }).catch(err => {
                return res.status(500).send(err.message || 'Somethng went wrong');
            });
    },
    findById: async (req, res) => {
        await Employment.findById(req.params.id)
            .populate({ path: 'job dates skills employer contact_details', select: '-employment -__v' })
            .then(data => {
                if (!data) {
                    return res.status(404).send('Employment id not found');
                }
                return res.send(data)
            }).catch(err => {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send('Employment id not found')
                }
                return res.status(500).send(err.message || 'Something went wrong')
            })
    },
    update: async (req, res) => {
        await Employment.findByIdAndUpdate(req.body.id, req.body, { new: true })
            .then(data => {
                if (!data) {
                    return res.status(404).send('Employment ID not found');
                }
                return res.send(data);
            }).catch(err => {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send('Employment id not found')
                }
                return res.status(500).send('Employment id not found')
            })
    },
    delete: async (req, res) => {
        await Employment.findByIdAndDelete(req.body.id)
            .then(data => {
                if (!data) {
                    return res.status(404).send('Employment id not found')
                }
                return res.send(data);
            }).catch(err => {
                if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                    return res.status(404).send('Employment id not found');
                }
                return res.status(500).send(err.message || 'Something went wrong');
            })

    }
}

module.exports = employmentController;
