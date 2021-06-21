const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PersonSchema = mongoose.Schema({
    first_name: { type: String, required: true },
    middle_name: { type: String, required: true },
    last_name: { type: String, required: true },
    employee: {
        type: Schema.Types.ObjectId,
        ref: 'Employee',
        required:true
    },
}, {
    timestamp: true
});
module.exports = mongoose.model('Person', PersonSchema);