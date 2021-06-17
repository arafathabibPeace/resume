const Job = require('../models/job.model');
const Employment = require('../models/employment.model');

const contactController = {

    create: async (req, res) => {
        const newObject = new Job(req.body);
        await newObject.save()
            .then(data => {
                return res.send(data);
            }).catch(err => {
                return res.status(500).send(err.message || 'Something went wrong');
            });
        const parentObject = await Employment.findById({ _id: req.body.employment });
        parentObject.job.push(newObject);
        await parentObject.save();
    },
    findAll: async (req, res) => {
        await Job.find()
            .then(data => {
                return res.send(data);
            }).catch(err => {
                return res.status(500).send(err.message || 'Somethng went wrong');
            });
    },
    findById: async (req, res) => {
        await Job.findById(req.params.id)
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
        await Job.findByIdAndUpdate(req.body.id, req.body, { new: true })
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
        await Job.findByIdAndDelete(req.body.id)
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
