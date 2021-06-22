const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AwardSchema = mongoose.Schema({
    award_name: { type: String, required: true },
    award_description:String,
    award_code:String,
    foreign_id: {
        type: Schema.Types.ObjectId,
        required: true,
        refPath: 'onModel'
    },
    onModel: {
        type: String,
        required: true,
        enum: ['Person', 'Education']
    }
}, {
    timestamp: true
})
module.exports = mongoose.model('Award', AwardSchema);