const Skill = require('../models/skill.model');
const Person = require('../models/person.model');
const Job = require('../models/job.model');
const skillController = {
    create: async (req, res) => {
        let onModel=''
        const parentObject = await Person.findById({ _id: req.body.foreign_id })
        const parentObject2 = await Job.findById(req.body.foreign_id)
        if (!parentObject&&!parentObject2) {
            return res.status(400).send('ParentObject id is not found')
        }
        if(parentObject) onModel='Person'
        if(parentObject2) onModel='Job'
      
        await Skill.create({...req.body,onModel:onModel})
            .then(data => {
                return res.send(data);
            })
            .catch(err => {
                return res.send(err.message || 'Something went wrong.')
            })
    },
    findAll: async (req, res) => {
        await Skill.find().populate('foreign_id')
            .then(data => {
                return res.send(data);
            }).catch(err => {
                return res.status(500).send(err.message || 'Somethng went wrong');
            });
    },
    findById: async (req, res) => {
        await Skill.findById(req.params.id).populate('foreign_id')
            .then(data => {
                if (!data) {
                    return res.status(404).send('Skill id not found');
                }
                return res.send(data)
            }).catch(err => {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send('Skill id not found')
                }
                return res.status(500).send(err.message || 'Something went wrong')
            })
    },
    update: async (req, res) => {
        await Skill.findByIdAndUpdate(req.body.id, req.body, { new: true })
            .then(data => {
                if (!data) {
                    return res.status(404).send('Skill id not found');
                }
                return res.send(data);
            }).catch(err => {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send('Contact id not found')
                }
                return res.status(500).send('Contact id not found')
            })
    },
    delete: async (req, res) => {
        await Skill.findByIdAndDelete(req.body.id)
            .then(data => {
                if (!data) {
                    return res.status(404).send('Contact id not found')
                }
                return res.send(data);
            }).catch(err => {
                if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                    return res.status(404).send('Contact id not found');
                }
                return res.status(500).send(err.message || 'Something went wrong');
            })

    }
}

module.exports = skillController;
