const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContactSchema = mongoose.Schema({
    contact_name: { type: String, required: true },
    contact_value: { type: String, required: true },
    employee: {
        type: Schema.Types.ObjectId,
        ref: 'Employee'
    }
}, {
    timestamp: true
})
module.exports = mongoose.model('Contact', ContactSchema);