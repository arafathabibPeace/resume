const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PersonSchema = mongoose.Schema({
    first_name: { type: String, required: true },
    middle_name: { type: String, required: true },
    last_name: { type: String, required: true },
    gender: String,
    foreign_id: {
        type: Schema.Types.ObjectId,
        required: true,
        refPath: 'onModel'
    },
    onModel: {
        type: String,
        required: true,
        enum: ['User', 'CharacterReference']
    }
}, {
    timestamp: true
});
module.exports = mongoose.model('Person', PersonSchema);