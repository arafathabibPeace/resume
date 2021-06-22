const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DateSchema = mongoose.Schema({
    date_name: { type: String, required: true },
    date: {type: String, required:true},
    foreign_id: {
        type: Schema.Types.ObjectId,
        required: true,
        refPath: 'onModel'
    },
    onModel: {
        type: String,
        required: true,
        enum: ['Person','Employment', 'Education', 'Award']
    }
}, {
    timestamp: true
})
module.exports = mongoose.model('Date', DateSchema);