const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EducationSchema = mongoose.Schema({
    education_level: { type: String, required: true },
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
module.exports = mongoose.model('Education', EducationSchema);