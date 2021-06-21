const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AccountSchema = mongoose.Schema({
    account_name: { type: String, required: true },
    account_description: String,
}, {
    timestamps: true
});

module.exports = mongoose.model('Account', AccountSchema);

