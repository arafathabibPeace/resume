const Company = require('../models/company.model');
const Job = require('../models/job.model');
const Education = require('../models/education.model');
const CharacterReference = require('../models/characterReference.model');
const Award = require('../models/award.model');

const contactController = {

    create: async (req, res) => {
        let onModel = ''
        const parentObject = await Job.findById({ _id: req.body.foreign_id })
        const parentObject2 = await Education.findById({ _id: req.body.foreign_id })
        const parentObject3 = await CharacterReference.findById({ _id: req.body.foreign_id })
        const parentObject4 = await Award.findById({ _id: req.body.foreign_id })


        if (!parentObject && !parentObject2 && !parentObject3&&!parentObject4) {
            return res.status(400).send('ParentObject id is not found')
        }
        if (parentObject) onModel = 'Job'
        if (parentObject2) onModel = 'Education'
        if (parentObject3) onModel = 'CharacterReference'
        if (parentObject4) onModel = 'Award'


        await Company.create({ ...req.body, onModel: onModel })
            .then(data => {
                return res.send(data);
            })
            .catch(err => {
                return res.send(err.message || 'Something went wrong.')
            })
    },
    findAll: async (req, res) => {
        await Company.find()
            .then(data => {
                return res.send(data);
            }).catch(err => {
                return res.status(500).send(err.message || 'Somethng went wrong');
            });
    },
    findById: async (req, res) => {
        await Company.findById(req.params.id).populate('foreign_id')
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
