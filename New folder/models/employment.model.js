const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmploymentSchema = mongoose.Schema({
    job: [{
        type: Schema.Types.ObjectId,
        ref: 'Job'
    }],
    employer:[{
        type: Schema.Types.ObjectId,
        ref: 'Company'
    }],
    dates:[{
        type: Schema.Types.ObjectId,
        ref: 'Date'
    }],
    skills:[{
        type: Schema.Types.ObjectId,
        ref: 'Skills'
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