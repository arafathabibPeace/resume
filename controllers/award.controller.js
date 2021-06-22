const Award = require('../models/award.model');
const Education = require('../models/education.model');
const Person = require('../models/person.model');

const awardController = {

    create: async (req, res) => {
        const parentObject = await Education.findById({ _id: req.body.foreign_id })||await Person.findById({ _id: req.body.foreign_id });
        if (!parentObject) {
            return res.status(400).send('Parent object id is not found')
        }
        await Award.create(req.body)
            .then(data => {
                return res.send(data);
            })
            .catch(err => {
                return res.send(err.message || 'Something went wrong.')
            })
    },
    findAll: async (req, res) => {
        await Award.find().populate('foreign_id')
            .then(data => {
                return res.send(data);
            }).catch(err => {
                return res.status(500).send(err.message || 'Somethng went wrong');
            });
    },
    findById: async (req, res) => {
        await Award.findById(req.params.id)
            .then(data => {
                if (!data) {
                    return res.status(404).send('Award id not found');
                }
                return res.send(data)
            }).catch(err => {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send('Award id not found')
                }
                return res.status(500).send(err.message || 'Something went wrong')
            })
    },
    update: async (req, res) => {
        await Award.findByIdAndUpdate(req.body.id, req.body, { new: true })
            .then(data => {
                if (!data) {
                    return res.status(404).send('Award id not found');
                }
                return res.send(data);
            }).catch(err => {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send('Award id not found')
                }
                return res.status(500).send('Award id not found')
            })
    },
    delete: async (req, res) => {
        await Award.findByIdAndDelete(req.body.id)
            .then(data => {
                if (!data) {
                    return res.status(404).send('Award id not found')
                }
                return res.send(data);
            }).catch(err => {
                if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                    return res.status(404).send('Award id not found');
                }
                return res.status(500).send(err.message || 'Something went wrong');
            })

    }
}

module.exports = awardController;
