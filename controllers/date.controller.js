const Date = require('../models/date.model');
const Person = require('../models/person.model');
const Employment = require('../models/employment.model');
const Education = require('../models/education.model');
const awardModel = require('../models/award.model');

const dateController = {
    create: async (req, res) => {

        const parentObject = await Employment.findById({ _id: req.body.foreign_id }) ||
            await Person.findById({ _id: req.body.foreign_id }) ||
            await Education.findById({ _id: req.body.foreign_id })||
            await awardModel.findById({ _id: req.body.foreign_id });

        if (!parentObject) {
            return res.status(400).send('ParentObject id is not found')
        }
        await Date.create(req.body)
            .then(data => {
                return res.send(data);
            })
            .catch(err => {
                return res.send(err.message || 'Something went wrong.')
            })
    },
    findAll: async (req, res) => {
        await Date.find().populate('foreign_id')
            .then(data => {
                return res.send(data);
            }).catch(err => {
                return res.status(500).send(err.message || 'Somethng went wrong');
            });
    },
    findById: async (req, res) => {
        await date.findById(req.params.id).populate('foreign_id')
            .then(data => {
                if (!data) {
                    return res.status(404).send('Date id not found');
                }
                return res.send(data)
            }).catch(err => {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send('Date id not found')
                }
                return res.status(500).send(err.message || 'Something went wrong')
            })
    },
    update: async (req, res) => {
        await Date.findByIdAndUpdate(req.body.id ,req.body, { new: true })
            .then(data => {
                if (!data) {
                    return res.status(404).send('Date id not found');
                }
                return res.send(data);
            }).catch(err => {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send('Date id not found')
                }
                return res.status(500).send('Date id not found')
            })
    },
    delete: async (req, res) => {
        await Date.findByIdAndDelete(req.body.id)
            .then(data => {
                if (!data) {
                    return res.status(404).send('Date id not found')
                }
                return res.send(data);
            }).catch(err => {
                if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                    return res.status(404).send('Date id not found');
                }
                return res.status(500).send(err.message || 'Something went wrong');
            })

    }
}

module.exports = dateController;
