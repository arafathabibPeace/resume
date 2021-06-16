const Employee = require('../models/employee.model');
const User = require('../models/user.model');

const employeeController = {
    create: async (req, res) => {

        if (!req.body) {
            res.status(400).send({ message: 'Please fill all required field' })
        }
        const employee = new Employee(req.body);
        await employee.save()
            .then(data => {
                res.send(data);
            }).catch(err => { //this return error message if there is error in User.findById({ _id: req.body.user })
                res.status(500).send(err.message || 'Something went wrong');
            })

        const user = await User.findById({ _id: req.body.user });
        user.employees.push(employee);
        await user.save();
    },

    findAll: async (req, res) => {
        await Employee.find()
            .then(data => {
                res.send(data);
            }).catch(err => {
                res.status(500).send(err.message || 'Something went wrong');
            })
    },
    findOneById: async (req, res) => {
        await Employee.findById(req.params.id)
            .then(data => {
                if(!data){
                    res.status(404).send('Employee id does not found');
                }
                res.send(data);
            }).catch(err => {
                if(err.kind==='ObjectId'){
                    res.status(404).send('Employee id does not found')
                }
                res.status(500).send(err.message || 'Something went wrong');
            })
    },
    update: async (req, res) => {
        if (!req.body) {
            res.status(400).send({ message: 'Please fill all required field' })
        }

        await Employee.findByIdAndUpdate(req.body.id, req.body, { new: true })
            .then(data => {
                if (!data) {
                    res.status(404).send('Employee ID does not exist');
                }
                res.send(data);
            }).catch(err => {
                if (err.kind === 'ObjectId') {
                    res.status(404).send('Employee ID does not exist')
                }
                res.status(500).send('Employee ID does not exist')
            })

    },
    delete: async (req, res) => {
        await Employee.findByIdAndDelete(req.body.id)
            .then(data => {
                if (!data) {
                    res.status(404).send('Employee ID not found')
                }
                res.send(data);
            }).catch(err => {
                if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                    res.status(404).send("user not found with id " + req.body.id);
                }
                res.status(500).send(err.message || 'Something went wrong');
            })
        res.send(employee);
    }
}
module.exports = employeeController;