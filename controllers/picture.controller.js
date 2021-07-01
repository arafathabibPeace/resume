const Picture = require('../models/picture.model');
const Person = require('../models/person.model');
const Skill = require('../models/skill.model');

const pictureController = {
    create: async (req, res) => {
        let onModel = ''
        const parentObject = await Person.findById({ _id: req.body.foreign_id })
        const parentObject2 = await Skill.findById({ _id: req.body.foreign_id })
        if (!parentObject) {
            return res.status(400).send('Parent object id is not found')
        }

        if (parentObject) onModel = 'Person'
        if (parentObject2) onModel = 'Skill'
        await Picture.create({ picture_path: req.file.path, foreign_id: req.body.foreign_id, onModel: onModel })
            .then(data => {
                return res.send(data);
            })
            .catch(err => {
                return res.send(err.message || 'Something went wrong.')
            })
    },
    findAll: async (req, res) => {
        await Picture.find().populate('foreign_id')
            .then(data => {
                return res.send(data);
            }).catch(err => {
                return res.status(500).send(err.message || 'Somethng went wrong');
            });
    },
    findById: async (req, res) => {
        await Picture.findById(req.params.id)
            .then(data => {
                if (!data) {
                    return res.status(404).send('Picture id not found');
                }
                return res.send(data)
            }).catch(err => {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send('Picture id not found')
                }
                return res.status(500).send(err.message || 'Something went wrong')
            })
    },
    update: async (req, res) => {
        await Picture.findByIdAndUpdate(req.body.id, req.body, { new: true })
            .then(data => {
                if (!data) {
                    return res.status(404).send('Picture id not found');
                }
                return res.send(data);
            }).catch(err => {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send('Picture id not found')
                }
                return res.status(500).send('Picture id not found')
            })
    },
    delete: async (req, res) => {
        await Picture.findByIdAndDelete(req.body.id)
            .then(data => {
                if (!data) {
                    return res.status(404).send('Picture id not found')
                }
                return res.send(data);
            }).catch(err => {
                if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                    return res.status(404).send('Picture id not found');
                }
                return res.status(500).send(err.message || 'Something went wrong');
            })

    }
}

module.exports = pictureController;
