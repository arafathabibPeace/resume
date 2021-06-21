const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SkillSchema = mongoose.Schema({
    skill_name: { type: String, required: true },
    skill_rate: String,
    on_parent: {
        type: Schema.Types.ObjectId,
        required: true,
        refPath: 'onModel'
    },
    onModel: {
        type: String,
        required: true,
        enum: ['Person','Job']
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Skill', SkillSchema);
