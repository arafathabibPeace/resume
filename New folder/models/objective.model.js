const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ObjectiveSchema = mongoose.Schema({
    objective: { type: String, required: true },
    employee: {
        type: Schema.Types.ObjectId,
        ref: 'Employee',
        required:true
    }
}, {
    timestamp: true
})
module.exports = mongoose.model('Objective', ObjectiveSchema);