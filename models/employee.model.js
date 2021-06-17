const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmployeeSchema = mongoose.Schema({

    resume_name: { type: String, required: true },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    objectives: [{
        type: Schema.Types.ObjectId,
        ref: 'Objective',
    }],
    person_details: [{
        type: Schema.Types.ObjectId,
        ref: 'Person'
    }],
    contact_details: [{
        type: Schema.Types.ObjectId,
        ref: 'Contact'
    }],
    employments: [{
        type: Schema.Types.ObjectId,
        ref: 'Employment'
    }]

}, {
    timestamps: true
});

module.exports = mongoose.model('Employee', EmployeeSchema);

