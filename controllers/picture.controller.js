const Picture = require('../models/picture.model');
const Person = require('../models/person.model');
const Skill = require('../models/skill.model');

const pictureController = {
    create: async (req, res) => {
        const parentObject = await Person.findById({ _id: req.body.on_parent })||
        await Skill.findById({ _id: req.body.on_parent });
        if (!parentObject) {
            return res.status(400).send('Parent object id is not found')
        }

        await Picture.create({ picture_name: req.body.picture_name, picture_path: req.file.path, on_parent: req.body.on_parent, onModel:req.body.onModel})
            .then(data => {
                return res.send(data);
            })
            .catch(err => {
                return res.send(err.message || 'Something went wrong.')
            })
    },
    findAll: async (req, res) => {
        await Picture.find().populate('on_parent')
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
