const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DateSchema = mongoose.Schema({
    award_name: { type: String, required: true },
    award_description:String,
    award_code:String,
    
}, {
    timestamp: true
})
module.exports = mongoose.model('Date', DateSchema);