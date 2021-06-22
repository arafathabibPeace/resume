const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CompanySchema = mongoose.Schema({
    company_name: { type: String, required: true },
    foreign_id: {
        type: Schema.Types.ObjectId,
        required: true,
        refPath: 'onModel'
    },
    onModel: {
        type: String,
        required: true,
        enum: ['Employment', 'Education', 'CharacterReference']
    }
}, {
    timestamp: true
})
module.exports = mongoose.model('Company', CompanySchema);