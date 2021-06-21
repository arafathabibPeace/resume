const Contact = require('../models/contact.model');
const Person = require('../models/person.model');
const Company = require('../models/company.model');
const characterReference = require('../models/characterReference.model');

const contactController = {

    create: async (req, res) => {

        const parentObject = await Company.findById({ _id: req.body.on_parent }) ||
            await Person.findById({ _id: req.body.on_parent }) ||
            await characterReference.findById({ _id: req.body.on_parent });
        if (!parentObject) {
            return res.status(404).send('Parent object id is not found')
        }
        await Contact.create(req.body)
            .then(data => {
                return res.send(data);
            })
            .catch(err => {
                return res.send(err.message || 'Something went wrong.')
            })

    },
    findAll: async (req, res) => {
        await Contact.find().populate('on_parent')
            .then(data => {
                return res.send(data);
            }).catch(err => {
                return res.status(500).send(err.message || 'Somethng went wrong');
            });
    },
    findById: async (req, res) => {
        await Contact.findById(req.params.id).populate('on_parent')
            .then(data => {
                if (!data) {
                    return res.status(404).send('Contact Id not found');
                }
                return res.send(data)
            }).catch(err => {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send('Contact Id not found')
                }
                return res.status(500).send(err.message || 'Something went wrong')
            })
    },
    update: async (req, res) => {
        await Contact.findByIdAndUpdate(req.body.id, req.body, { new: true })
            .then(data => {
                if (!data) {
                    return res.status(404).send('Contact ID not found');
                }
                return res.send(data);
            }).catch(err => {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send('Contact id not found')
                }
                return res.status(500).send('Contact id not found')
            })
    },
    delete: async (req, res) => {
        await Contact.findByIdAndDelete(req.body.id)
            .then(data => {
                if (!data) {
                    return res.status(404).send('Contact id not found')
                }
                return res.send(data);
            }).catch(err => {
                if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                    return res.status(404).send('Contact id not found');
                }
                return res.status(500).send(err.message || 'Something went wrong');
            })

    }
}

module.exports = contactController;
