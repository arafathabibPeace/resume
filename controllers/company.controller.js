const Company = require('../models/company.model');
const Employment = require('../models/employment.model');
const Education = require('../models/education.model');
const characterReference = require('../models/characterReference.model');
const contactController = {

    create: async (req, res) => {
        const parentObject = await Employment.findById({ _id: req.body.on_parent })||
        await Education.findById({ _id: req.body.on_parent })||
        await characterReference.findById({ _id: req.body.on_parent })
        if (!parentObject) {
            return res.status(400).send('ParentObject id is not found')
        }
        await Company.create(req.body)
            .then(data => {
                return res.send(data);
            })
            .catch(err => {
                return res.send(err.message || 'Something went wrong.')
            })
    },
    findAll: async (req, res) => {
        await Company.find().populate('on_parent')
            .then(data => {
                return res.send(data);
            }).catch(err => {
                return res.status(500).send(err.message || 'Somethng went wrong');
            });
    },
    findById: async (req, res) => {
        await Company.findById(req.params.id).populate('on_parent')
            .then(data => {
                if (!data) {
                    return res.status(404).send('Job Id not found');
                }
                return res.send(data)
            }).catch(err => {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send('Job Id not found')
                }
                return res.status(500).send(err.message || 'Something went wrong')
            })
    },
    update: async (req, res) => {
        await Company.findByIdAndUpdate(req.body.id, req.body, { new: true })
            .then(data => {
                if (!data) {
                    return res.status(404).send('Job ID not found');
                }
                return res.send(data);
            }).catch(err => {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send('Job id not found')
                }
                return res.status(500).send('Job id not found')
            })
    },
    delete: async (req, res) => {
        await Company.findByIdAndDelete(req.body.id)
            .then(data => {
                if (!data) {
                    return res.status(404).send('Job id not found')
                }
                return res.send(data);
            }).catch(err => {
                if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                    return res.status(404).send('Job id not found');
                }
                return res.status(500).send(err.message || 'Something went wrong');
            })

    }
}

module.exports = contactController;
