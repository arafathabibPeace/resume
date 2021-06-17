const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SkillSchema = mongoose.Schema({

    skill_name: { type: String, required: true },
    skill_rate: String,
    employment: {
        type: Schema.Types.ObjectId,
        ref: 'Employment',
        required: true
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Skill', SkillSchema);
