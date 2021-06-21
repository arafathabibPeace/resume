const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ResumeSchema = mongoose.Schema({

    resume_name: { type: String, required: true },
    objectives: String,
    on_parent: {
        type: Schema.Types.ObjectId,
        required: true,
        refPath: 'onModel',
    },
    onModel: {
        type: String,
        required: true,
        enum: ['Person']
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Resume', ResumeSchema);

