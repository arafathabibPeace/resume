const Date = require('../models/date.model');
const Person = require('../models/person.model');
const Job = require('../models/job.model');
const Education = require('../models/education.model');
const Award = require('../models/award.model');

const dateController = {
    create: async (req, res) => {
        let onModel = ''
        const parentObject = await Job.findById({ _id: req.body.foreign_id })
        const parentObject2 = await Person.findById({ _id: req.body.foreign_id })
        const parentObject3 = await Education.findById({ _id: req.body.foreign_id })
        const parentObject4 = await Award.findById({ _id: req.body.foreign_id });

        if (!parentObject && !parentObject2 && !parentObject3 && !parentObject4) {
            return res.status(400).send('ParentObject id is not found')
        }

        if (parentObject) onModel = 'Job'
        if (parentObject2) onModel = 'Person'
        if (parentObject3) onModel = 'Education'
        if (parentObject4) onModel = 'Award'

        await Date.create({ ...req.body, onModel: onModel })
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
        await Date.findByIdAndUpdate(req.body.id, req.body, { new: true })
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
