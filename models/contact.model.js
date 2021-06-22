const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContactSchema = mongoose.Schema({
    contact_name: { type: String, required: true },
    contact_value: { type: String, required: true },
    foreign_id: {
        type: Schema.Types.ObjectId,
        required: true,
        refPath: 'onModel'
    },
    onModel: {
        type: String,
        required: true,
        enum: ['Person', 'Company', 'CharacterReference']
    }
}, {
    timestamp: true
})
module.exports = mongoose.model('Contact', ContactSchema);