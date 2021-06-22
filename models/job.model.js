const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JobSchema = mongoose.Schema({
    job_name: { type: String, required: true },
    job_description: String,    
    foreign_id: {
        type: Schema.Types.ObjectId,
        required: true,
        refPath: 'onModel'
    },
    onModel: {
        type: String,
        required: true,
        enum: ['Company']
    }
}, {
    timestamp: true
})
module.exports = mongoose.model('Job', JobSchema);