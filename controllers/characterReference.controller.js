const CharacterReference = require('../models/characterReference.model');
const Person = require('../models/person.model');

const characterReferenceController = {
    create: async (req, res) => {
        const parentObject = await Person.findById({ _id: req.body.foreign_id })
        if (!parentObject) {
            return res.status(404).send('Account id is not found')
        }
        await CharacterReference.create({ ...req.body, onModel: 'Person' })
            .then(data => {
                return res.send(data);
            })
            .catch(err => {
                return res.send(err.message || 'Something went wrong.')
            })
    },
    findAll: async (req, res) => {
        await CharacterReference.find().populate('foreign_id')
            .then(data => {
                return res.send(data);
            }).catch(err => {
                return res.status(500).send(err.message || 'Something went wrong');
            })
    },
    findById: async (req, res) => {
        await CharacterReference.findById(req.params.id).populate('foreign_id')
            .then(data => {
                if (!data) {
                    return res.status(404).send('CharacterReference id does not found');
                }
                return res.send(data);
            }).catch(err => {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send('CharacterReference id does not found')
                }
                return res.status(500).send(err.message || 'Something went wrong');
            })
    },
    update: async (req, res) => {
        if (!req.body) {
            res.status(400).send({ message: 'Please fill all required field' })
        }

        await CharacterReference.findByIdAndUpdate(req.body.id, req.body, { new: true })
            .then(data => {
                if (!data) {
                    res.status(404).send('CharacterReference id does not exist');
                }
                res.send(data);
            }).catch(err => {
                if (err.kind === 'ObjectId') {
                    res.status(404).send('CharacterReference id does not exist')
                }
                res.status(500).send('CharacterReference id does not exist')
            })

    },
    delete: async (req, res) => {
        await CharacterReference.findByIdAndDelete(req.body.id)
            .then(data => {
                if (!data) {
                    return res.status(404).send('CharacterReference id does not exist')
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
module.exports = characterReferenceController;