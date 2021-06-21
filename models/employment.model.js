const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmploymentSchema = mongoose.Schema({
    on_parent: {
        type: Schema.Types.ObjectId,
        required: true,
        refPath: 'onModel'
    },
    onModel: {
        type: String,
        required: true,
        enum: ['Person']
    }
}, {
    timestamp: true
})
module.exports = mongoose.model('Employment', EmploymentSchema);