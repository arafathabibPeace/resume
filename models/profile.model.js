const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = mongoose.Schema({

    profilename: { type: String, required: true },
    objectives: String,
    foreign_id: {
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

module.exports = mongoose.model('Profile', ProfileSchema);

