const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseSchema = mongoose.Schema({
    course_name: { type: String, required: true },
    course_major: {type: String, required:true},
    foreign_id: {
        type: Schema.Types.ObjectId,
        required: true,
        refPath: 'onModel'
    },
    onModel: {
        type: String,
        required: true,
        enum: ['Education']
    }
}, {
    timestamp: true
})
module.exports = mongoose.model('Course', CourseSchema);