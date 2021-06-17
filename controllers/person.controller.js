const Person = require('../models/person.model')  ;
const Employee = require('../models/employee.model');

const personController = {
    create: async (req, res) => {

        if (!req.body) {
            res.status(400).send({ message: 'Please fill all required field' })
        }
        const newObject = new Person(req.body);
        await newObject.save()
            .then(data => {
                return res.send(data);
            }).catch(err => { //this return error message if there is error in User.findById({ _id: req.body.user })
                return res.status(500).send(err.message || 'Something went wrong');
            })

        const parentObject = await Employee.findById({ _id: req.body.employee });
        parentObject.person_details.push(newObject);
        await parentObject.save();
    },

    findAll: async (req, res) => {
        await Person.find()
            .then(data => {
                return res.send(data);
            }).catch(err => {
                return res.status(500).send(err.message || 'Something went wrong');
            })
    },
    findById: async (req, res) => {
        await Person.findById(req.params.id)
            .then(data => {
                if (!data) {
                    return res.status(404).send('Person id does not found');
                }
                return res.send(data);
            }).catch(err => {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send('Person id does not found')
                }
                return res.status(500).send(err.message || 'Something went wrong');
            })
    },
    update: async (req, res) => {
        if (!req.body) {
            res.status(400).send({ message: 'Please fill all required field' })
        }

        await Person.findByIdAndUpdate(req.body.id, req.body, { new: true })
            .then(data => {
                if (!data) {
                    res.status(404).send('Person id does not exist');
                }
                res.send(data);
            }).catch(err => {
                if (err.kind === 'ObjectId') {
                    res.status(404).send('Person id does not exist')
                }
                res.status(500).send('Person id does not exist')
            })

    },
    delete: async (req, res) => {
        await Person.findByIdAndDelete(req.body.id)
            .then(data => {
                if (!data) {
                    return res.status(404).send('Person id does not exist')
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
module.exports = personController;