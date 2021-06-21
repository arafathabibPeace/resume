const Course = require('../models/course.model');
const Education = require('../models/education.model');

const courseController = {
    create: async (req, res) => {
        //this catches error if the send params name is wrong
        // if(!req.body.course_name||!req.body.course_major||!req.body.on_parent||!req.body.onModel){
        //     return res.status(404).send('error');
        // }
        const parentObject = await Education.findById({ _id: req.body.on_parent });

        if (!parentObject) {
            return res.status(400).send('ParentObject id is not found')
        }
        await Course.create(req.body)
            .then(data => {
                return res.send(data);
            })
            .catch(err => {
                return res.send(err.message || 'Something went wrong.')
            })
    },
    findAll: async (req, res) => {
        await Course.find().populate('on_parent')
            .then(data => {
                return res.send(data);
            }).catch(err => {
                return res.status(500).send(err.message || 'Somethng went wrong');
            });
    },
    findById: async (req, res) => {
        await date.findById(req.params.id).populate('on_parent')
            .then(data => {
                if (!data) {
                    return res.status(404).send('Course id not found');
                }
                return res.send(data)
            }).catch(err => {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send('Course id not found')
                }
                return res.status(500).send(err.message || 'Something went wrong')
            })
    },
    update: async (req, res) => {
        await Course.findByIdAndUpdate(req.body.id ,req.body, { new: true })
            .then(data => {
                if (!data) {
                    return res.status(404).send('Course id not found');
                }
                return res.send(data);
            }).catch(err => {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send('Course id not found')
                }
                return res.status(500).send('Course id not found')
            })
    },
    delete: async (req, res) => {
        await Course.findByIdAndDelete(req.body.id)
            .then(data => {
                if (!data) {
                    return res.status(404).send('Course id not found')
                }
                return res.send(data);
            }).catch(err => {
                if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                    return res.status(404).send('Course id not found');
                }
                return res.status(500).send(err.message || 'Something went wrong');
            })

    }
}

module.exports = courseController;
