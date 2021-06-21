const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DateSchema = mongoose.Schema({
    date_name: { type: String, required: true },
    date: {type: Date, required:true},
    employment: {
        type: Schema.Types.ObjectId,
        ref: 'Employment'
    },
}, {
    timestamp: true
})
module.exports = mongoose.model('Date', DateSchema);