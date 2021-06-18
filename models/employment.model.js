const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmploymentSchema = mongoose.Schema({
    job: [{
        type: Schema.Types.ObjectId,
        ref: 'Job'
    }],
    skills: [{
        type: Schema.Types.ObjectId,
        ref: 'Skill'
    }],
    employer:[{
        type: Schema.Types.ObjectId,
        ref: 'Company'
    }],
    employee: {
        type: Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },
}, {
    timestamp: true
})
module.exports = mongoose.model('Employment', EmploymentSchema);