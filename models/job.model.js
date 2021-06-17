const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JobSchema = mongoose.Schema({
    job_name: { type: String, required: true },
    job_description: String,
    employment: {
        type: Schema.Types.ObjectId,
        ref: 'Employment'
    }
}, {
    timestamp: true
})
module.exports = mongoose.model('Job', JobSchema);