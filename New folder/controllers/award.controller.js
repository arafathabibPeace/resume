const Award = require('../models/award.model');
const Employment = require('../models/employment.model');

const dateController = {

    create: async (req, res) => {
        //const parentObject = req.body['employment'] ? await Employment.findById({ _id: req.body.employment }) : await Award.findById({ _id: req.body.award });
        const parentObject = await Employment.findById({ _id: req.body.employment });

        if (!parentObject) {
            return res.status(400).send('ParentObject id is not found')
        }
        const newObject = new Award(req.body);
        await newObject.save()
            .then(data => {
                return res.send(data);
            }).catch(err => {
                return res.status(500).send(err.message || 'Something went wrong');
            });
        parentObject.dates.push(newObject);
        await parentObject.save();
    },
    findAll: async (req, res) => {
        await Award.find()
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
        await Award.findByIdAndUpdate(req.body.id, req.body, { new: true })
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
        await Award.findByIdAndDelete(req.body.id)
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
