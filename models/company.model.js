const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CompanySchema = mongoose.Schema({
    company_name: { type: String, required: true },
    employment: {
        type: Schema.Types.ObjectId,
        ref: 'Employment',
        required: true
    },
    contact_details: [{
        type: Schema.Types.ObjectId,
        ref: 'Contact'
    }],
}, {
    timestamp: true
})
module.exports = mongoose.model('Company', CompanySchema);